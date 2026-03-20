import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./auth.css";

function CreateNewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Create New Password form submitted", data);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="auth-details">
          <header className="auth-header">
            <h1>Create New Password</h1>
            <p className="auth-subtitle">
              Today is a new day. It's your day. You shape it. <br /> Sign in to
              start managing your projects.
            </p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="auth-field">
              <span>Enter New Password</span>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#858D9D" />
                  ) : (
                    <Eye size={18} color="#858D9D" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <span className="field-error">Password is required.</span>
              ) : null}
            </label>
            <label className="auth-field">
              <span>Confirm Password</span>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { required: true })}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} color="#858D9D" />
                  ) : (
                    <Eye size={18} color="#858D9D" />
                  )}
                </button>
              </div>
              {errors.confirmPassword ? (
                <span className="field-error">
                  Confirm password is required.
                </span>
              ) : null}
            </label>
            <Link
              className="link"
              to="/forgot-password"
              style={{ alignSelf: "flex-end", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
            <button className="submit-btn" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <div className="auth-illustration">
        <div className="bottom">
          <img
            src="/auth-images/create-password-illustration.svg"
            alt="auth illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateNewPassword;
