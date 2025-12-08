import LeetCodeProfilesTable from "./LeetCodeProfilesTable.jsx";
import { useEffect, useState } from "react";
import AddUser from "./AddUser.jsx";
import RegisterPage from "./RegisterPage.jsx";
import ErrorBanner from "./ErrorBanner.jsx";

export default function Dashboard({ updateView, globalError, setGlobalError }) {
  const [newUsername, setNewUsername] = useState("");
  const [leetcodeProfiles, setLeetcodeProfiles] = useState([]);
  const [codeforcesProfiles, setCodeforcesProfiles] = useState([]);


  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => setGlobalError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [globalError, setGlobalError]);

  const token = localStorage.getItem("token");
  if (!token) {
    return <RegisterPage onSuccessfulRegister={() => updateView("login")} />;
  }

  return (
    <div
      className="dashboard"
      style={{
        background: "var(--dashboard-bg)",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      <AddUser
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        setGlobalError={setGlobalError}
        setLeetcodeProfiles={setLeetcodeProfiles}
    />


      {globalError && <ErrorBanner message={globalError} />}

      <LeetCodeProfilesTable
        leetcodeProfiles={leetcodeProfiles}
        setLeetcodeProfiles={setLeetcodeProfiles}
        setGlobalError={setGlobalError}
      />

    </div>
  );
}
