import Product from "../models/Product.js";
import Invoice from "../models/Invoice.js";
import { success, error } from "../utils/response.js";
import { productSchema } from "../validators/productSchemas.js";

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.search) {
      const searchStr = req.query.search;
      const sl = searchStr.toLowerCase();
      const regex = new RegExp(searchStr, "i");
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const conditions = [{ name: regex }];

      if ("expired".includes(sl)) {
        conditions.push({ expiryDate: { $lt: today } });
      }
      if ("out of stock".includes(sl)) {
        conditions.push({ quantity: 0 });
      }
      if ("low stock".includes(sl)) {
        conditions.push({
          $expr: { $and: [ { $lte: ["$quantity", "$threshold"] }, { $gt: ["$quantity", 0] } ] },
          $or: [{ expiryDate: { $exists: false } }, { expiryDate: { $gte: today } }]
        });
      }
      if ("in-stock".includes(sl) || "in stock".includes(sl)) {
        conditions.push({
          $expr: { $gt: ["$quantity", "$threshold"] },
          $or: [{ expiryDate: { $exists: false } }, { expiryDate: { $gte: today } }]
        });
      }

      query.$or = conditions;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments(query);

    return success(
      res,
      {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Products fetched successfully",
      200,
    );
  } catch (err) {
    next(err);
  }
};

// GET /api/products/product-stats
export const getProductStats = async (req, res, next) => {
  try {
    const allProducts = await Product.find(
      {},
      "category price quantity threshold expiryDate",
    );
    let totalProductCount = 0;
    let totalStockValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    const categoriesSet = new Set();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    allProducts.forEach((p) => {
      if (p.category) categoriesSet.add(p.category);
      totalProductCount += p.quantity;
      totalStockValue += p.price * p.quantity;
      const isExpired = p.expiryDate && new Date(p.expiryDate) < today;
      if (isExpired || p.quantity === 0) {
        outOfStockCount++;
      } else if (p.quantity <= p.threshold) {
        lowStockCount++;
      }
    });

    return success(
      res,
      {
        categories: categoriesSet.size,
        totalProducts: totalProductCount,
        totalStockValue,
        lowStockCount,
        outOfStockCount,
      },
      "Product stats fetched successfully",
      200,
    );
  } catch (err) {
    next(err);
  }
};

// POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const validatedData = productSchema.parse(req.body);

    const existing = await Product.findOne({
      productId: validatedData.productId,
    });
    if (existing) {
      return error(res, 400, "Product ID already exists");
    }

    const product = await Product.create(validatedData);
    return success(res, { product }, "Product created successfully", 201);
  } catch (err) {
    if (err.name === "ZodError") {
      return error(res, 400, err.errors.map((e) => e.message).join(", "));
    }
    next(err);
  }
};

// POST /api/products/bulk
export const bulkCreateProducts = async (req, res, next) => {
  try {
    const csvText = req.body;
    if (!csvText || typeof csvText !== "string") {
      return error(
        res,
        400,
        "Invalid CSV data. Ensure Content-Type is text/csv.",
      );
    }

    const lines = csvText.split("\n").filter((line) => line.trim() !== "");
    if (lines.length < 2) {
      return error(
        res,
        400,
        "CSV must contain a header and at least one data row",
      );
    }

    const productsToInsert = [];
    const validationErrors = [];

    // Skip the header row
    for (let i = 1; i < lines.length; i++) {
      // Split by commas (simple parser, assuming no commas within fields)
      const values = lines[i].split(",").map((v) => v.trim());

      const productData = {
        name: values[0],
        productId: values[1],
        category: values[2],
        price: Number(values[3]),
        quantity: Number(values[4]),
        unit: values[5],
        expiryDate: values[6] ? new Date(values[6]).toISOString() : undefined,
        threshold: Number(values[7]),
        imageUrl: values[8] || undefined,
      };

      try {
        const validated = productSchema.parse(productData);
        productsToInsert.push(validated);
      } catch (zodErr) {
        validationErrors.push(
          `Row ${i + 1}: ${zodErr.errors.map((e) => e.message).join(", ")}`,
        );
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "CSV Validation Failed",
        errors: validationErrors,
      });
    }

    try {
      const result = await Product.insertMany(productsToInsert, {
        ordered: false,
      });
      return success(
        res,
        { count: result.length },
        "Products imported successfully",
        201,
      );
    } catch (dbErr) {
      if (dbErr.code === 11000) {
        return error(res, 400, "Duplicate Product IDs found in CSV or DB.");
      }
      throw dbErr;
    }
  } catch (err) {
    next(err);
  }
};

// POST /api/products/buy/:id
export const buyProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return error(res, 400, "Invalid quantity");
    }

    const product = await Product.findById(id);
    if (!product) {
      return error(res, 404, "Product not found");
    }

    if (product.quantity < quantity) {
      return error(res, 400, "Insufficient stock");
    }

    // Atomically reduce quantity
    product.quantity -= quantity;
    await product.save();

    // Generate Invoice ID starting from INV-1001
    const lastInvoice = await Invoice.findOne({ invoiceId: /^INV-\d+$/ })
      .sort({ invoiceId: -1 });
    
    let nextInvoiceNumber = 1001;
    if (lastInvoice && lastInvoice.invoiceId) {
      const match = lastInvoice.invoiceId.match(/INV-(\d+)/);
      if (match) {
        nextInvoiceNumber = parseInt(match[1]) + 1;
      }
    }

    const invoiceId = `INV-${nextInvoiceNumber}`;

    // Create Invoice
    const invoice = await Invoice.create({
      invoiceId,
      amount: product.price * quantity,
      status: "Unpaid",
      items: [
        {
          productId: product._id,
          productName: product.name,
          quantity,
          price: product.price,
        },
      ],
      // dueDate is handled by pre-save hook (+7 days)
    });

    return success(
      res,
      { product, invoice },
      "Product purchased and invoice generated successfully",
      201,
    );
  } catch (err) {
    next(err);
  }
};
