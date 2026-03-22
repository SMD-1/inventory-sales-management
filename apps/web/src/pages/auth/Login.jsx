import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import "./auth.css";
import { post } from "../../utils/api.js";
import { setToken } from "../../utils/auth.js";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await post("/api/auth/login", data);
      if (response?.data?.token) {
        setToken(response.data.token);
      }
      toast.success(response.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="auth-details">
          <header className="auth-header">
            <h1>Log in to your account</h1>
            <p className="auth-subtitle">
              Welcome back! Please enter your details.
            </p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                placeholder="Example@email.com"
                {...register("email", { required: true })}
              />
              {errors.email ? (
                <span className="field-error">Email is required.</span>
              ) : null}
            </label>
            <label className="auth-field">
              <span>Password</span>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="at least 8 characters"
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
            <Link
              className="link forgot-password-link"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
            <button className="submit-btn" type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </form>
          <p className="auth-switch">
            Don't you have an account?{" "}
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="auth-illustration">
        <div className="top">
          <h1>
            Welcome to <br /> Company Name
          </h1>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className="bottom">
          <img
            src="/auth-images/auth-illustration.svg"
            alt="auth illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
