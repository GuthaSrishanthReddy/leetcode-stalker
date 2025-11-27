export default function Table({ profiles }) {
  return (
    <div className="profiles-table">
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>easy</th>
            <th>medium</th>
            <th>hard</th>
            <th>updated on</th>
          </tr>
        </thead>

        <tbody>

            <tr key="demo-user">
              <td>
                <a 
                  href={`https://leetcode.com/g_srishanth_reddy/`}
                  target="_blank"
                >
                  g_srishanth_reddy
                </a>
              </td>

              <td>21</td>
              <td>21</td>
              <td>21</td>

              <td>date</td>

              {/* Delete + Refresh buttons will go here */}
            </tr>


          {profiles.map((user) => (
            <tr key={user.id}>
              <td>
                <a 
                  href={`https://leetcode.com/${user.username}`}
                  target="_blank"
                >
                  {user.username}
                </a>
              </td>

              <td>{user.easy}</td>
              <td>{user.medium}</td>
              <td>{user.hard}</td>

              <td>{new Date(user.lastUpdated).toLocaleDateString()}</td>

              {/* Delete + Refresh buttons will go here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
