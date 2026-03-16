import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css";

function CreateNewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
