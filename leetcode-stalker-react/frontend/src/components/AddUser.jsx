import React from "react"; 
import {useState} from "react";

export default function AddUser({ handleAddUser, newUsername, setNewUsername }) {

  return (
    
    <div className="add-user">

      <div className="cta-box">
       <label htmlFor="username-input">LeetCode Username:</label>
       <input
        type="text"
        placeholder="LeetCode Username"
        required
        className="cta-input"
        id="username-input"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button
        className="cta-button"
        onClick={handleAddUser}
      >
        Add User
      </button>
</div>
    </div>
  );
}