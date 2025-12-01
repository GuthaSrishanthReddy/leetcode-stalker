import React from "react";
import "../styles/ProfilesTable.css";


export default function ProfilesTable({ profiles, handleDelete, handleRefresh }) {
  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="card">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Easy</th>
                <th>Medium</th>
                <th>Hard</th>
                <th>Total</th>
                <th>Rating</th>
                <th>Top %</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>

           <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="username">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://leetcode.com/${profile.username}`}
                    >
                      {profile.username}
                    </a>
                  </td>

                  <td>{profile.easy}</td>
                  <td>{profile.medium}</td>
                  <td>{profile.hard}</td>
                  <td>{profile.total}</td>
                  <td> <div className="flex justify-center adjust-center"> {profile.rating??'--'}</div> </td>
                  <td> <div className="flex justify-center adjust-center"> {profile.topPercentage??'--'}</div> </td>
                  <td>{new Date(profile.lastUpdated).toLocaleDateString()}</td>
                  <td className="actions">
                    <button onClick={() => handleRefresh(profile.username)}>
                      <span className="icon">⟲</span>
                    </button>
                    <button onClick={() => handleDelete(profile.username)}>
                      <span className="icon">🗑</span>
                    </button>
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
