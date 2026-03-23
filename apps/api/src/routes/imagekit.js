import { Router } from "express";
import ImageKit from "imagekit";
import { success, error } from "../utils/response.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/config", authMiddleware, (req, res) => {
  return success(res, {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  }, "ImageKit config fetched", 200);
});

router.get("/auth", authMiddleware, (req, res) => {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.json(authenticationParameters);
  } catch (err) {
    console.error("ImageKit Auth Error:", err);
    return error(res, 500, "Failed to authenticate with ImageKit");
  }
});

export default router;
