import { useEffect, useState } from "react";
import { useHeader } from "../../contexts/header-context";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { get, put } from "../../utils/api.js";
import toast from "react-hot-toast";
import "./settings.css";

const Settings = () => {
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });
  const [passwords, setPasswords] = useState({ password: "************", confirmPassword: "************" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await get("/api/auth/me");
        if (response?.data?.user) {
          const fullName = (response.data.user.name || "").trim();
          const nameParts = fullName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ").trim();
          setProfile({
            firstName,
            lastName,
            email: (response.data.user.email || "").trim(),
          });
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const isPasswordChanged = passwords.password && passwords.password !== "************";

    if (isPasswordChanged && passwords.password !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsSaving(true);
      const name = `${profile.firstName} ${profile.lastName}`.trim();
      const payload = { name };
      
      if (isPasswordChanged) {
        payload.password = passwords.password;
      }

      await put("/api/auth/me", payload);
      toast.success("Profile updated successfully");
      setPasswords({ password: "************", confirmPassword: "************" }); // Reset password fields back to asterisks
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="tab">Edit Profile</div>
          <X className="close-icon" onClick={() => navigate(-1)} size={24} cursor="pointer" color="#1c1c1c" />
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-group">
            <label>First name</label>
            <input 
              type="text" 
              value={profile.firstName} 
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input 
              type="text" 
              value={profile.lastName} 
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={profile.email} 
              disabled 
              style={{ cursor: "not-allowed", color: "#858D9D", backgroundColor: "#f9fafb" }} 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: "relative", width: "100%", display: "flex" }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={passwords.password} 
                onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} 
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} color="#858D9D" /> : <Eye size={18} color="#858D9D" />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div style={{ position: "relative", width: "100%", display: "flex" }}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={passwords.confirmPassword} 
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} 
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} color="#858D9D" /> : <Eye size={18} color="#858D9D" />}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Settings;
