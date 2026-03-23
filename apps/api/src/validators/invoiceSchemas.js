import { z } from "zod";

export const invoiceSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  status: z.enum(["Paid", "Unpaid"]).default("Unpaid"),
  dueDate: z.string().transform((str) => new Date(str)).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().optional(),
        productName: z.string().min(1, "Product name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().min(0, "Price must be a positive number"),
      }),
    )
    .optional(),
});

export const updateInvoiceSchema = invoiceSchema.partial();
