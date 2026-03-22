import { useForm } from "react-hook-form";
import "./auth.css";

function OtpVerification() {
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
            <h1>Enter Your OTP</h1>
            <p className="auth-subtitle">
              We've sent a 6-digit OTP to your registered mail. <br /> Please
              enter it below to sign in.
            </p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="auth-field">
              <span>OTP</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                required
                placeholder="xxxx12"
                {...register("otp", { required: true })}
              />
              {errors.otp ? (
                <span className="field-error">OTP is required.</span>
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
          src="/auth-images/otp-verification-illustration.svg"
          alt="auth illustration"
        />
      </div>
    </div>
  );
}

export default OtpVerification;
