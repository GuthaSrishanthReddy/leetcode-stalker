import Table from "./Table";
import { useEffect, useState } from "react";
import { addProfile, listProfiles, deleteProfile, refreshProfile } from "../api/leetcode.js";
import AddUser from "./AddUser.jsx";

export default function Dashboard() {

    const [profiles, setProfiles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    async function loadProfiles() {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await listProfiles(token);
                setProfiles(response.data);
                setLoading(false);
                
            } catch (err) {
                setLoading(false);
                console.log(err);
                setError('Failed to fetch profiles');
            }
        }

    async function handleAddUser() {
        if (!newUsername.trim()) return;

        setLoading(true);
        setError("");

        try {
        const token = localStorage.getItem("token");
        await addProfile(newUsername.trim());

        setNewUsername(""); 
        await loadProfiles();
        } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to add profile");
        }

        setLoading(false);
    }


    useEffect(() => { loadProfiles()
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
            <AddUser
                newUsername={newUsername}
                setNewUsername={setNewUsername}
                handleAddUser={handleAddUser}
            />
            <Table profiles={profiles} />
        </div>
    );


}