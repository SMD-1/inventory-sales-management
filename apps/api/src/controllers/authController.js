import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateOtp from "../utils/otp.js";
import sendOtpEmail from "../utils/mailer.js";
import { success, error } from "../utils/response.js";

const createToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash -otpHash");
    if (!user) {
      return error(res, 404, "User not found");
    }
    return success(res, { user }, "User fetched successfully", 200);
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return error(res, 409, "Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    return success(
      res,
      { user: { id: user._id, name: user.name, email: user.email } },
      "Account created",
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return error(res, 401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return error(res, 401, "Invalid credentials");
    }

    const token = createToken(user._id);

    return success(
      res,
      {
        token,
        user: { id: user._id, name: user.name, email: user.email },
      },
      "Login successful",
      200
    );
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return error(res, 404, "User not found");
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otpHash = otpHash;
    user.otpExpiresAt = otpExpiresAt;
    user.otpVerifiedUntil = null;
    await user.save();

    await sendOtpEmail({ to: user.email, otp });

    return success(res, { otp }, "OTP sent to email", 200);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.otpHash || !user.otpExpiresAt) {
      return error(res, 400, "OTP not found");
    }

    if (user.otpExpiresAt.getTime() < Date.now()) {
      return error(res, 400, "OTP expired");
    }

    const isMatch = await bcrypt.compare(otp, user.otpHash);
    if (!isMatch) {
      return error(res, 400, "Invalid OTP");
    }

    user.otpHash = null;
    user.otpExpiresAt = null;
    user.otpVerifiedUntil = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    return success(res, {}, "OTP verified", 200);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return error(res, 404, "User not found");
    }

    if (!user.otpVerifiedUntil || user.otpVerifiedUntil.getTime() < Date.now()) {
      return error(res, 400, "OTP verification required");
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.otpVerifiedUntil = null;
    await user.save();

    return success(res, {}, "Password reset successful", 200);
  } catch (error) {
    next(error);
  }
};
