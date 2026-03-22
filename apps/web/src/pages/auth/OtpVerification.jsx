import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./auth.css";
import { post } from "../../utils/api.js";
import { getResetEmail } from "../../utils/auth.js";

function OtpVerification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const resetEmail = getResetEmail();

  useEffect(() => {
    if (!resetEmail) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate, resetEmail]);

  const onSubmit = async (data) => {
    if (!resetEmail) {
      toast.error("Please enter your email again");
      navigate("/forgot-password");
      return;
    }

    try {
      setIsSubmitting(true);
      await post("/api/auth/verify-otp", {
        email: resetEmail,
        otp: data.otp,
      });
      toast.success("OTP verified");
      navigate("/create-new-password");
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    } finally {
      setIsSubmitting(false);
    }
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

            <button className="submit-btn" type="submit" disabled={isSubmitting}>
              Verify OTP
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
