// HomePage.jsx
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Dashboard</h1>

        <div className="grid">
          <div className="card">
            <h2>Quick Actions</h2>
            <div className="button-group">
              <button className="button">Search</button>
              <button className="button outline">Settings</button>
            </div>
          </div>

          <div className="card">
            <h2>System Info</h2>
            <div>
              <p>Version: 1.0.0</p>
              <p>Status: Active</p>
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <Link to="/profile" className="button">
            Profile & Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
