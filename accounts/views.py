# accounts/views.py

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import LeetCodeData
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages
import requests

# Login view
def user_login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)

        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, 'Invalid credentials')
        else:
            messages.error(request, 'Invalid credentials')

    else:
        form = AuthenticationForm()
    return render(request, 'accounts/user_login.html', {'form': form})



# Logout view
def user_logout(request):
    logout(request)
    return redirect('login')



class CustomUserCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']



# (Optional) Signup view
def user_signup(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully. You can now log in.')
            return redirect('login')
        else:
            messages.error(request, 'Signup failed. Please check the form.')
    else:
        form = CustomUserCreationForm()
        form.fields['password2'].label = "Confirm Password"

    return render(request, 'accounts/signup.html', {'form': form})


def scrape_leetcode_data(username):
    url = "https://leetcode.com/graphql"
    headers = {
        "Content-Type": "application/json",
        "Referer": f"https://leetcode.com/{username}/"
    }

    query = """
    query getUserData($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        submitStats {
        acSubmissionNum {
            difficulty
            count
        }
        }
    }
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
    }
    }
    """

    variables = {"username": username}

    response = requests.post(url, json={"query": query, "variables": variables}, headers=headers)
    data = response.json()


    if not data.get("data") or data["data"].get("matchedUser") is None:
        return None

    submit_stats = data['data']['matchedUser']['submitStats']['acSubmissionNum']
    easy = submit_stats[1]['count']
    medium = submit_stats[2]['count']
    hard = submit_stats[3]['count']
    total = easy + medium + hard

    user_contest_ranking = data['data'].get('userContestRanking')
    if user_contest_ranking:
        rating = user_contest_ranking.get('rating', '--') or '--'
        top_percentage = user_contest_ranking.get('topPercentage', '--') or '--'
    else:
        rating = '--'
        top_percentage = '--'

    rating = str(rating).strip()
    rating_parts = rating.split('.')
    rating = rating_parts[0] + '.' + rating_parts[1][:2] if len(rating_parts) > 1 else rating_parts[0]

    if not total:
        return None

    return {
        'username': username,
        'easy': easy,
        'medium': medium,
        'hard': hard,
        'total': total,
        'rating': rating,
        'top_percentage': top_percentage
    }



@login_required
def dashboard(request):
    user = request.user

    if request.method == 'POST':
        target_username = request.POST['target_username'].lower()
        data = scrape_leetcode_data(target_username)

        if data:
            # Delete if already exists
            LeetCodeData.objects.filter(user=user, username=target_username).delete()

            # Create or update the record
            leetcode_record, created = LeetCodeData.objects.update_or_create(
                user=request.user,
                username=target_username,
                defaults={
                    'easy': data['easy'],
                    'medium': data['medium'],
                    'hard': data['hard'],
                    'rating': data['rating'],
                    'top_percentage': data['top_percentage'],
                    'total': data['total']
                }
            )

            if created:
                messages.success(request, f'{target_username} added successfully.')
            else:
                messages.info(request, f'{target_username} updated successfully.')
        else:
            messages.error(request, f"Couldn't fetch data for {target_username} (user may not exist or the account might be private).")

        return redirect('dashboard')

    # Refresh all existing usernames when tab is loaded
    all_user_data = LeetCodeData.objects.filter(user=user)
    for record in all_user_data:
        updated_data = scrape_leetcode_data(record.username)
        if updated_data:
            record.easy = updated_data['easy']
            record.medium = updated_data['medium']
            record.hard = updated_data['hard']
            record.total = updated_data['total']
            record.rating = updated_data['rating']
            record.top_percentage = updated_data['top_percentage']

            record.save()

    context = {
        'leetcode_data': LeetCodeData.objects.filter(user=user)
    }

    return render(request, 'accounts/dashboard.html', context)


def delete_leetcode_user(request, pk):
    user_data = get_object_or_404(LeetCodeData, pk=pk, user=request.user)
    user_data.delete()
    messages.success(request, "LeetCode user data deleted successfully.")
    return redirect('dashboard')