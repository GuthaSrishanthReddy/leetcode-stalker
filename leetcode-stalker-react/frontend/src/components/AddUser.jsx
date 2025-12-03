import React from "react";
import { useRef } from "react";
import "../styles/AddUser.css";

export default function AddUser({ handleAddUser, newUsername, setNewUsername }) {
  const button_ref = useRef(null)

  function handleEnter(e){
    if(e.key==="Enter"){
      button_ref.current.click();
    }
  }

  return (
    <label className="adduser-wrapper" htmlFor="adduser-input">
      <input
        id="adduser-input"
        placeholder="LeetCode Username"
        className="adduser-input"
        value={newUsername}
        onKeyDown={handleEnter}
        onChange={(e) => setNewUsername(e.target.value)}
        required
      />

      <button className="adduser-btn" onClick={handleAddUser} ref={button_ref}>
        <div className="btn-inner">
          <span className="btn-text"> Add User</span>
        </div>
      </button>
    </label>
  );
}
