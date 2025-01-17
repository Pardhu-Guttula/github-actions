import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

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

export default ProfileLayout;
