import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login submitted", data);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="auth-details">
          <header className="auth-header">
            <h1>Login to your account</h1>
            <p className="auth-subtitle">
              Welcome back! Please enter your details.
            </p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
              <span>Password</span>
              <input
                type="password"
                placeholder="Create a password"
                {...register("password", { required: true })}
              />
              {errors.password ? (
                <span className="field-error">Password is required.</span>
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
              Sign in
            </button>
          </form>
          <p className="auth-switch">
            Already have an account?{" "}
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
