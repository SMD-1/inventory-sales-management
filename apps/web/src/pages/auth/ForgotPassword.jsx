import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import "./auth.css";
import { post } from "../../utils/api.js";
import { setResetEmail } from "../../utils/auth.js";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await post("/api/auth/forgot-password", {
        email: data.email,
      });
      if (response?.data?.otp) {
        const otp = response.data.otp;
        toast.success(
          (t) => (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span>OTP: <strong>{otp}</strong></span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(otp);
                  toast.success("Copied to clipboard!");
                  toast.dismiss(t.id);
                }}
                style={{
                  padding: "6px",
                  background: "transparent",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#334155")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                title="Copy OTP"
              >
                <Copy size={16} />
              </button>
            </div>
          ),
          {
            duration: 6000,
            style: {
              padding: "16px 24px",
            },
          }
        );
      } else {
        toast.success("OTP sent to email");
      }
      setResetEmail(data.email);
      navigate("/otp-verification");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
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

            <button className="submit-btn" type="submit" disabled={isSubmitting}>
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
