import { Router } from "express";
import express from "express";
import {
  getProducts,
  createProduct,
  bulkCreateProducts,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/products
router.get("/", authMiddleware, getProducts);

// POST /api/products
router.post("/", authMiddleware, createProduct);

// POST /api/products/bulk
// Use express.text to natively receive text/csv
router.post(
  "/bulk",
  authMiddleware,
  express.text({ type: "text/csv", limit: "10mb" }),
  bulkCreateProducts,
);

export default router;
