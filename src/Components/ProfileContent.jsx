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
export default ProfileContent;
