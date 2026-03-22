import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import "./auth.css";
import { post } from "../../utils/api.js";
import { clearResetEmail, getResetEmail } from "../../utils/auth.js";

function CreateNewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const resetEmail = getResetEmail();

  useEffect(() => {
    if (!resetEmail && !hasSubmitted) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate, resetEmail, hasSubmitted]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!resetEmail) {
      toast.error("Please enter your email again");
      navigate("/forgot-password");
      return;
    }

    try {
      setIsSubmitting(true);
      setHasSubmitted(true);
      await post("/api/auth/reset-password", {
        email: resetEmail,
        password: data.password,
      });
      clearResetEmail();
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Password reset failed");
    } finally {
      setIsSubmitting(false);
    }
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
            <button className="submit-btn" type="submit" disabled={isSubmitting}>
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
