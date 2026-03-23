import { Router } from "express";
import express from "express";
import {
  bulkCreateProducts,
  createProduct,
  getProducts,
  getProductStats,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/products/product-stats
router.get("/product-stats", authMiddleware, getProductStats);

// GET /api/products
router.get("/", authMiddleware, getProducts);

// POST /api/products
router.post("/", authMiddleware, createProduct);

// POST /api/products/bulk
router.post(
  "/bulk",
  authMiddleware,
  express.text({ type: "text/csv", limit: "10mb" }),
  bulkCreateProducts,
);

export default router;
