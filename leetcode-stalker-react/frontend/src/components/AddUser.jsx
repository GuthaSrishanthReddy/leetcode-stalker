import React, { useRef } from "react";
import "../styles/AddUser.css";
import { addProfile, listProfiles } from "../api/leetcode.js";

export default function AddUser({
  newUsername,
  setNewUsername,
  setGlobalError,
  setLeetcodeProfiles,
}) {
  const buttonRef = useRef(null);

  function handleEnter(e) {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  }

  async function loadLeetCodeProfiles() {
    try {
      const token = localStorage.getItem("token");
      const response = await listProfiles(token);
      setLeetcodeProfiles(response.data || []);
    } catch (err) {
      console.log(err);
      setGlobalError("Failed to fetch profiles");
    }
  }

  async function handleAddUser() {
    if (!newUsername.trim()) return;

    try {
      setGlobalError(null);
      const token = localStorage.getItem("token");
      const res = await addProfile(newUsername.trim(), token);

      if (!res || res.status >= 400) {
        setGlobalError(res?.data?.message || "Failed to add profile");
        return;
      }

      setNewUsername("");
      await loadLeetCodeProfiles();
    } catch (err) {
      console.log(err);
      setGlobalError(err?.response?.data?.message || "Failed to add profile");
    }
  }

  return (
    <div className="adduser-container">
      <div className="adduser-wrapper">
        <input
          placeholder="LeetCode Username"
          className="adduser-input"
          value={newUsername}
          onKeyDown={handleEnter}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <button className="adduser-btn" onClick={handleAddUser} ref={buttonRef}>
          <div className="btn-inner">
            <span className="btn-text">Add User</span>
          </div>
        </button>
      </div>
    </div>
  );
}
