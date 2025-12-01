import axios from "axios";
const LEETCODE_API_URL = "https://leetcode.com/graphql";

const query = `
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
    `;


export default async function LeetCodeDataFetcher(username) {
    try{
        const resp = await axios.post(LEETCODE_API_URL, {
            query : query,
            variables: { username },

        headers: {
            "Content-Type": "application/json",
            "accept" : "application/json"
        }
        });
        const data = resp.data.data;
        if(!data || !data.matchedUser){
            return null;
        }

        const submissionStats = data.matchedUser.submitStats.acSubmissionNum;
        const easy = submissionStats[1].count;
        const medium = submissionStats[2].count;
        const hard = submissionStats[3].count;
        const total = submissionStats[0].count;
        const rating = data.userContestRanking ? data.userContestRanking.rating : null;
        const topPercentage = data.userContestRanking ? data.userContestRanking.topPercentage : null;

        return{
            easy,
            medium,
            hard,
            total,
            rating,
            topPercentage
        };
    }catch(e){
        return null;
    }
}

