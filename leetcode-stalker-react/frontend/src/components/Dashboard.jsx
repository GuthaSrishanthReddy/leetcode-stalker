import ProfilesTable from "./ProfilesTable.jsx";
import { useEffect, useState } from "react";
import { addProfile, listProfiles, deleteProfile, refreshProfile } from "../api/leetcode.js";
import AddUser from "./AddUser.jsx";
import RegisterPage from "./RegisterPage.jsx";
import ErrorBanner from "./ErrorBanner.jsx";

export default function Dashboard({updateView, globalError, setGlobalError}) {

    const [profiles, setProfiles] = useState([]);
    const [newUsername, setNewUsername] = useState("");

    async function loadProfiles() {
            setGlobalError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await listProfiles(token);
                setProfiles(response.data);
                
            } catch (err) {
                console.log(err);
                setGlobalError('Failed to fetch profiles');
            }
        }

    async function handleAddUser() {
    if (!newUsername.trim()) return;

    try {
        setGlobalError(null);
        const token = localStorage.getItem("token");
        const res = await addProfile(newUsername.trim(), token);

        if (!res || res.status >= 400) {
        console.log("addProfile response:", res);
        setGlobalError(res?.data?.message || "Failed to add profile");
        return;
        }

        // SUCCESS
        setNewUsername("");
        await loadProfiles();
    } catch (err) {
        console.log(err);
        setGlobalError(err?.response?.data?.message || "Failed to add profile");
    }
    }




    async function handleDelete(profileId) {
        try {
            setGlobalError(null);
            const token = localStorage.getItem("token");

            await deleteProfile(profileId, token);
            await loadProfiles();
        } catch (err) {
            console.log(err);
            setGlobalError(err?.response?.data?.message || "Failed to delete profile");
        }
    }


    async function handleRefresh(profileId) {
        try {
            setGlobalError(null);
            const token = localStorage.getItem("token");

            await refreshProfile(profileId, token);
            await loadProfiles();
        } catch (err) {
            console.log(err);
            setGlobalError(err?.response?.data?.message || "Failed to refresh profile");
        }
    }



    useEffect(() => { 
        loadProfiles();
        const interval = setInterval(()=>{
            loadProfiles();
        }, 10000);
        return ()=>clearInterval(interval);
    }, []);

    useEffect(() => {
        if (globalError) {
            const timer = setTimeout(() => setGlobalError(null), 4000);
            return () => clearTimeout(timer);
        }
        }, [globalError]);

    
    const token = localStorage.getItem("token");
    if (!token) {
        return <RegisterPage onSuccessfulRegister={() => updateView("login")} />;
    }


    return (
        <>

            <div className="dashboard" style={{
                background: 'var(--dashboard-bg) !important',
                height: '100vh',
                width: '100vw',
                margin: 0,
                padding: 0
            }}>

                <AddUser
                    newUsername={newUsername}
                    setNewUsername={setNewUsername}
                    handleAddUser={handleAddUser}
                />

                {globalError && <ErrorBanner message={globalError}/>}

                <ProfilesTable profiles={profiles} handleDelete={handleDelete} handleRefresh={handleRefresh} />
            </div>
        </>
    );


}