import React, { useEffect, useState } from "react";
import "../styles/LeetCodeProfilesTable.css";
import Loading from "./Loading.jsx";
import { listProfiles, deleteProfile, refreshProfile } from "../api/leetcode.js";

export default function LeetCodeProfilesTable({ profiles, setProfiles, setGlobalError }) {
  const [isLoading, setIsLoading] = useState(true);

  async function loadLeetCodeProfiles() {
    try {
      setGlobalError(null);
      const token = localStorage.getItem("token");
      const response = await listProfiles(token);
      setProfiles(response.data || []);
    } catch (err) {
      console.log(err);
      setGlobalError("Failed to fetch profiles");
    }
  }

  async function handleDelete(username) {
    try {
      setGlobalError(null);
      const token = localStorage.getItem("token");
      await deleteProfile(username, token);
      await loadLeetCodeProfiles();
    } catch (err) {
      console.log(err);
      setGlobalError(err?.response?.data?.message || "Failed to delete profile");
    }
  }

  async function handleRefresh(username) {
    try {
      setGlobalError(null);
      const token = localStorage.getItem("token");
      await refreshProfile(username, token);
      await loadLeetCodeProfiles();
    } catch (err) {
      console.log(err);
      setGlobalError(err?.response?.data?.message || "Failed to refresh profile");
    }
  }

  useEffect(() => {
    loadLeetCodeProfiles();
    const interval = setInterval(loadLeetCodeProfiles, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [profiles]);

  if (isLoading) {
    return <Loading message="Fetching accounts..." />;
  }

  if (profiles.length === 0) {
    return <p>Add a profile to display here!</p>;
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="card">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Username</th>
                <th className="easy-count">Easy</th>
                <th className="medium-count">Medium</th>
                <th className="hard-count">Hard</th>
                <th className="total-count">Total</th>
                <th>Rating</th>
                <th>Top %</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.username}>
                  <td className="username">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://leetcode.com/${profile.username}`}
                    >
                      {profile.username}
                    </a>
                  </td>

                  <td className="easy-count">{profile.easy}</td>
                  <td className="medium-count">{profile.medium}</td>
                  <td className="hard-count">{profile.hard}</td>
                  <td className="total-count">{profile.total}</td>
                  <td>{profile.rating ?? "--"}</td>
                  <td>{profile.topPercentage ?? "--"}</td>
                  <td>{new Date(profile.lastUpdated).toLocaleDateString()}</td>

                  <td className="actions">
                    <button onClick={() => handleRefresh(profile.username)}>⟲</button>

                    <div className="remove-button-container">
                      <button
                        className="remove-button"
                        onClick={() => handleDelete(profile.username)}
                      >
                        🧹
                      </button>
                      <span className="remove-button-hover-text">delete entry</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
