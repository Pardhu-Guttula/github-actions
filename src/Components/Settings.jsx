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

export default SettingsContent;
