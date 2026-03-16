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
    <div className="signup">
      <div className="signup-container">
        <div className="signup-details">
          <header className="signup-header">
            <h1>Enter Your OTP</h1>
            <p className="signup-subtitle">
              We've sent a 6-digit OTP to your registered mail. <br /> Please
              enter it below to sign in.
            </p>
          </header>
          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="signup-field">
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

            <button className="signup-btn" type="submit">
              Send Mail
            </button>
          </form>
        </div>
      </div>
      <div className="signup-illustration">
        <img
          src="/auth-images/otp-verification-illustration.svg"
          alt="auth illustration"
        />
      </div>
    </div>
  );
}

export default OtpVerification;
