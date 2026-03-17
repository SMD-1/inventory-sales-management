import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup submitted", data);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="auth-details">
          <header className="auth-header">
            <h1>Create account</h1>
            <p className="auth-subtitle">Start inventory management.</p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="auth-field">
              <span>Name</span>
              <input
                type="text"
                placeholder="Your name"
                {...register("name", { required: true })}
              />
              {errors.name ? (
                <span className="field-error">Name is required.</span>
              ) : null}
            </label>
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
              {errors.email ? (
                <span className="field-error">Email is required.</span>
              ) : null}
            </label>
            <label className="auth-field">
              <span>Create Password</span>
              <input
                type="password"
                placeholder="Create a password"
                {...register("password", { required: true })}
              />
              {errors.password ? (
                <span className="field-error">Password is required.</span>
              ) : null}
            </label>
            <label className="auth-field">
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword ? (
                <span className="field-error">
                  Confirm password is required.
                </span>
              ) : null}
            </label>
            <button className="submit-btn" type="submit">
              Sign up
            </button>
          </form>
          <p className="auth-switch">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Log in
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

export default Signup;
