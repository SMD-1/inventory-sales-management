import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  status: z.enum(["Paid", "Unpaid"]).default("Unpaid"),
  dueDate: z.string().transform((str) => new Date(str)).optional(),
});

export const updateInvoiceSchema = invoiceSchema.partial();
