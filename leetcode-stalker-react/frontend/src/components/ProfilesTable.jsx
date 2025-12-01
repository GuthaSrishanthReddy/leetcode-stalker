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
              </tr>
            </thead>

            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="username"><a target="_blank" rel="noopener noreferrer" href={`https://leetcode.com/${profile.username}`}>{profile.username}</a></td>
                  <td className="text-center">{profile.easy}</td>
                  <td className="text-center">{profile.medium}</td>
                  <td className="text-center">{profile.hard}</td>
                  <td className="text-center">{profile.total}</td>
                  <td><div className="text-center w-full">{profile.rating ?? "--"}</div></td>
                  <td><div className="text-center w-full">{profile.topPercentage ?? " -- "}</div></td>

                  <td>{new Date(profile.lastUpdated).toLocaleDateString()}</td>
                    <button onClick={() => handleRefresh(profile.username)}>⟲</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <button onClick={() => handleDelete(profile.username)}>🗑</button>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
