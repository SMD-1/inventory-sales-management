import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import invoiceRoutes from "./routes/invoice.js";
import imagekitRoutes from "./routes/imagekit.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config({ path: "../../.env" });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/imagekit", imagekitRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
