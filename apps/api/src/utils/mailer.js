import nodemailer from "nodemailer";

const getTransporter = () => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const sendOtpEmail = async ({ to, otp }) => {
  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM || "no-reply@example.com";

  if (!transporter) {
    return;
  }

  await transporter.sendMail({
    from,
    to,
    subject: "Your OTP for password reset",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });
};

export default sendOtpEmail;
