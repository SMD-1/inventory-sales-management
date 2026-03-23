import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  productId: z.string().min(1, "Product ID is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be non-negative"),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  unit: z.string().min(1, "Unit is required"),
  expiryDate: z.string().optional().nullable(),
  threshold: z.number().min(0, "Threshold must be non-negative"),
  imageUrl: z.string().optional().nullable().or(z.literal("")),
});
