import express from "express";
import {
  getInvoices,
  getInvoiceStats,
} from "../controllers/invoiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/invoices/invoice-stats
router.get("/invoice-stats", authMiddleware, getInvoiceStats);

// GET /api/invoices
router.get("/", authMiddleware, getInvoices);

export default router;
