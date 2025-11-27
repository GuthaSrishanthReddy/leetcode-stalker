import {useState} from "react";

export default function AddUser({ handleAddUser, newUsername, setNewUsername }) {

  return (
    
    <div className="add-user">
      <label htmlFor="username-input">LeetCode Username:</label>
      <input
        type="text"
        placeholder="LeetCode Username"
        id="username-input"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button
        className="add-user-button"
        onClick={() => handleAddUser()}
      >
        Add User
      </button>
    </div>
  );
}
