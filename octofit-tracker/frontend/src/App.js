import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              <span className="fs-4">OctoFit Tracker</span>
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👥 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">🏃 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">👫 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">⚡ Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="text-center mb-5">
                <h1 className="display-3 fw-bold">Welcome to OctoFit Tracker</h1>
                <p className="lead text-muted">Track your fitness activities, compete with teams, and achieve your wellness goals!</p>
              </div>
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-primary">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">🏃</div>
                      <h5 className="card-title fw-bold">Track Activities</h5>
                      <p className="card-text text-muted">Log your workouts and monitor your progress over time.</p>
                      <Link to="/activities" className="btn btn-primary mt-2">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-success">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">👫</div>
                      <h5 className="card-title fw-bold">Join Teams</h5>
                      <p className="card-text text-muted">Collaborate with others and achieve team fitness goals together.</p>
                      <Link to="/teams" className="btn btn-success mt-2">View Teams</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-warning">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">🏆</div>
                      <h5 className="card-title fw-bold">Compete</h5>
                      <p className="card-text text-muted">Check the leaderboard and see where you rank among peers.</p>
                      <Link to="/leaderboard" className="btn btn-warning mt-2">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 mt-3">
                <div className="col-md-6">
                  <div className="card h-100 shadow-sm border-info">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">👥</div>
                      <h5 className="card-title fw-bold">Community</h5>
                      <p className="card-text text-muted">Connect with other fitness enthusiasts in the community.</p>
                      <Link to="/users" className="btn btn-info mt-2">View Users</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card h-100 shadow-sm border-danger">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">⚡</div>
                      <h5 className="card-title fw-bold">Workout Plans</h5>
                      <p className="card-text text-muted">Get personalized workout suggestions tailored to your goals.</p>
                      <Link to="/workouts" className="btn btn-danger mt-2">View Workouts</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>

        <footer className="bg-light text-center text-muted py-4 mt-5">
          <div className="container">
            <p className="mb-0">© 2026 OctoFit Tracker. Built with ❤️ for fitness enthusiasts.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
