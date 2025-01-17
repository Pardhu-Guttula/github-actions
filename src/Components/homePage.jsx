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

const ProfileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSettings = location.pathname.includes("/settings");

  return (
    <div className="container">
      <div className="card">
        <div className="tabs">
          <button
            className={`tab ${!isSettings ? "active" : ""}`}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className={`tab ${isSettings ? "active" : ""}`}
            onClick={() => navigate("/profile/settings")}
          >
            Settings
          </button>
        </div>

        <Outlet />

        <div className="nav-buttons">
          <Link to="/" className="button">
            Back to Home
          </Link>
          <button className="button primary">
            Save {isSettings ? "Settings" : "Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ProfileContent.jsx
const ProfileContent = () => {
  return (
    <div className="form-group">
      <div>
        <label>Name</label>
        <input type="text" defaultValue="John Doe" />
      </div>

      <div>
        <label>Email</label>
        <input type="email" defaultValue="john@example.com" />
      </div>

      <div>
        <label>Bio</label>
        <textarea rows="4" defaultValue="Software Developer" />
      </div>
    </div>
  );
};

// SettingsContent.jsx
const SettingsContent = () => {
  return (
    <div className="settings-list">
      <div className="setting-item">
        <div>
          <h3>Notifications</h3>
          <p>Receive alerts and updates</p>
        </div>
        <input type="checkbox" defaultChecked />
      </div>

      <div className="setting-item">
        <div>
          <h3>Dark Mode</h3>
          <p>Switch between light and dark themes</p>
        </div>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export { HomePage, ProfileLayout, ProfileContent, SettingsContent };
