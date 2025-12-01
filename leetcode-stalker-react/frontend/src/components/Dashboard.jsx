import ProfilesTable from "./ProfilesTable.jsx";
import { useEffect, useState } from "react";
import { addProfile, listProfiles, deleteProfile, refreshProfile } from "../api/leetcode.js";
import AddUser from "./AddUser.jsx";
import RegisterPage from "./RegisterPage.jsx";

export default function Dashboard({updateView}) {

    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const [newUsername, setNewUsername] = useState("");

    async function loadProfiles() {
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await listProfiles(token);
                setProfiles(response.data);
                
            } catch (err) {
                console.log(err);
                setError('Failed to fetch profiles');
            }
        }

    async function handleAddUser() {
        if (!newUsername.trim()) return;

        setError("");

        try {
        const token = localStorage.getItem("token");
        await addProfile(newUsername.trim(), token);

        setNewUsername(""); 
        await loadProfiles();
        } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to add profile");
        }
    }

    async function handleDelete(profileId) {
        setError(null);
        try {
            const token = localStorage.getItem('token');
            await deleteProfile(profileId, token);
            await loadProfiles();
        }
        catch (err) {
            console.log(err);
            setError('Failed to delete profile');
        }
    }
    async function handleRefresh(profileId) {
        setError(null); 
        try {
            const token = localStorage.getItem('token');
            await refreshProfile(profileId, token);
            await loadProfiles();
        } catch (err) {
            console.log(err);
            setError('Failed to refresh profile');
        }
    }


    useEffect(() => { loadProfiles()
    }, []);
    if (error) return <div>Error: {error}</div>;
    
    const token = localStorage.getItem("token");
    if (!token) {
        return <RegisterPage onSuccessfulRegister={() => updateView("login")} />;
    }


    return (
        <div className="dashboard">
            <AddUser
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                handleAddUser={handleAddUser}
            />
            <ProfilesTable profiles={profiles} handleDelete={handleDelete} handleRefresh={handleRefresh} />
        </div>
    );


}