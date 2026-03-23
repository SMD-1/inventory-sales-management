import { Router } from "express";
import validate from "../middleware/validate.js";
import {
  signupSchema,
  loginSchema,
  forgotSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from "../validators/authSchemas.js";
import {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getMe,
  updateMe,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/forgot-password", validate(forgotSchema), forgotPassword);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);

export default router;
