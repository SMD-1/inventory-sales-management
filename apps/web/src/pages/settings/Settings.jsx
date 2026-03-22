import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./settings.css";

const Settings = () => {
  const { setTitle } = useHeader();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  return (
    <div className="settings-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="tab">Edit Profile</div>
          <X className="close-icon" onClick={() => navigate(-1)} size={24} cursor="pointer" color="#1c1c1c" />
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
