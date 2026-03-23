import express from "express";
import {
  getInvoices,
  getInvoiceStats,
  toggleInvoiceStatus,
  deleteInvoice,
} from "../controllers/invoiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/invoices/invoice-stats
router.get("/invoice-stats", authMiddleware, getInvoiceStats);

// PATCH /api/invoices/:id/status
router.patch("/:id/status", authMiddleware, toggleInvoiceStatus);

// DELETE /api/invoices/:id
router.delete("/:id", authMiddleware, deleteInvoice);

// GET /api/invoices
router.get("/", authMiddleware, getInvoices);

export default router;
