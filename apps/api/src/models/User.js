import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    otpHash: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    otpVerifiedUntil: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
