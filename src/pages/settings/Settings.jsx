import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";
import "./settings.css";

const Settings = () => {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  return (
    <div className="settings-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="tab">Edit Profile</div>
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label>First name</label>
            <input type="text" defaultValue="Sarthak" />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input type="text" defaultValue="Tripathi" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue="sarthak@gmail.com" disabled style={{cursor: "not-allowed"}} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" defaultValue="************" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" defaultValue="************" />
          </div>

          <div className="form-actions">
            <button type="button" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Settings;
