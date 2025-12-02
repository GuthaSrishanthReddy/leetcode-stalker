import React from "react";
import "../styles/AddUser.css";

export default function AddUser({ handleAddUser, newUsername, setNewUsername }) {
  return (
    <label className="adduser-wrapper" htmlFor="adduser-input">
      <input
        id="adduser-input"
        placeholder="LeetCode Username"
        className="adduser-input"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        required
      />

      <button className="adduser-btn" onClick={handleAddUser}>
        <div className="btn-inner">
          <span className="btn-text"> Add User</span>
        </div>
      </button>
    </label>
  );
}
