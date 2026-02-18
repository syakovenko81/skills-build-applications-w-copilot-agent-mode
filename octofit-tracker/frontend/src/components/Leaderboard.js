import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard - Fetching from REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed leaderboard:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard - Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-5">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading leaderboard...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="display-5">🏆 Leaderboard</h2>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-outline-primary">Weekly</button>
          <button type="button" className="btn btn-primary">Monthly</button>
          <button type="button" className="btn btn-outline-primary">All Time</button>
        </div>
      </div>
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No leaderboard entries found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Total Points</th>
                <th scope="col">Period</th>
                <th scope="col">Badge</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'table-warning' : ''}>
                  <th scope="row">
                    {index === 0 && <span className="badge bg-warning text-dark fs-5">🥇 1st</span>}
                    {index === 1 && <span className="badge bg-secondary fs-5">🥈 2nd</span>}
                    {index === 2 && <span className="badge bg-danger fs-5">🥉 3rd</span>}
                    {index > 2 && <span className="badge bg-light text-dark">{index + 1}</span>}
                  </th>
                  <td><strong>{entry.user_name || `User ${entry.user}`}</strong></td>
                  <td><span className="badge bg-primary fs-6">{entry.total_points} pts</span></td>
                  <td><span className="badge bg-info">{entry.period}</span></td>
                  <td>
                    {index < 3 && <span className="badge bg-success">Top Performer</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
