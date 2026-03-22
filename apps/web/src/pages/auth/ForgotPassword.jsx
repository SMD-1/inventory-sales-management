import { useForm } from "react-hook-form";
import "./auth.css";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Forgot password from submitted", data);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="auth-details">
          <header className="auth-header">
            <h1>Company name</h1>
            <p className="auth-subtitle">
              Please enter your registered email ID to receive an OTP
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

            <button className="submit-btn" type="submit">
              Send Mail
            </button>
          </form>
        </div>
      </div>
      <div className="auth-illustration">
        <img
          src="/auth-images/forgot-password-illustration.svg"
          alt="auth illustration"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
