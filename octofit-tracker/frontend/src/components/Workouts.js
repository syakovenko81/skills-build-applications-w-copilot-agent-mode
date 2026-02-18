import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts - Fetching from REST API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed workouts:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts - Error fetching data:', err);
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
        <p className="mt-2">Loading workouts...</p>
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
        <h2 className="display-5">Workout Suggestions</h2>
        <button className="btn btn-primary">
          <i className="bi bi-lightning"></i> Create Workout
        </button>
      </div>
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No workout suggestions found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Workout Name</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Est. Calories</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout.id}>
                  <th scope="row">{index + 1}</th>
                  <td><strong>{workout.name}</strong></td>
                  <td>{workout.description ? workout.description.substring(0, 50) + '...' : 'N/A'}</td>
                  <td><span className="badge bg-info">{workout.workout_type}</span></td>
                  <td>
                    <span className={`badge ${workout.difficulty_level === 'beginner' ? 'bg-success' : workout.difficulty_level === 'intermediate' ? 'bg-warning' : 'bg-danger'}`}>
                      {workout.difficulty_level}
                    </span>
                  </td>
                  <td>{workout.duration}</td>
                  <td><span className="text-danger fw-bold">{workout.estimated_calories}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">Start</button>
                    <button className="btn btn-sm btn-outline-secondary">Details</button>
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

export default Workouts;
