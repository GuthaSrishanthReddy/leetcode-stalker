import React, { useEffect, useState } from "react";
import "../styles/ProfilesTable.css";
import Loading from "./Loading";


export default function ProfilesTable({ profiles, handleDelete, handleRefresh }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(profiles.length > 0){
      setIsLoading(false);
    }
  }, [profiles])

  if(isLoading){
    return <><Loading message={"Fetching accounts "}/></>
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

                  <td className="easy-count">{profile.easy}</td>
                  <td className="medium-count">{profile.medium}</td>
                  <td className="hard-count">{profile.hard}</td>
                  <td className="total-count">{profile.total}</td>
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
