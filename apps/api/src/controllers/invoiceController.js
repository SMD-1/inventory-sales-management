import Invoice from "../models/Invoice.js";
import { success, error } from "../utils/response.js";

// GET /api/invoices
export const getInvoices = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.search) {
      const searchStr = req.query.search;
      const regex = new RegExp(searchStr, "i");
      
      query.$or = [
        { invoiceId: regex },
        { status: regex },
        { $expr: {
            $regexMatch: {
              input: { $toString: "$_id" },
              regex: searchStr,
              options: "i"
            }
          }
        }
      ];
    }

    const invoices = await Invoice.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Invoice.countDocuments(query);

    return success(
      res,
      {
        invoices,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Invoices fetched successfully",
      200
    );
  } catch (err) {
    next(err);
  }
};

// GET /api/invoices/invoice-stats
export const getInvoiceStats = async (req, res, next) => {
  try {
    const allInvoices = await Invoice.find({}, "amount status createdAt");
    
    let totalInvoices = allInvoices.length;
    let processedInvoices = 0;
    
    let paidAmountLast7Days = 0;
    let paidInvoicesLast7Days = 0;
    let unpaidAmountTotal = 0;
    let unpaidInvoicesCount = 0;
    
    let recentTransactionsCount = 0;
    
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    allInvoices.forEach((inv) => {
      if (inv.createdAt >= sevenDaysAgo) {
        recentTransactionsCount++;
      }

      if (inv.status === "Paid") {
        processedInvoices++;
        
        if (inv.createdAt >= sevenDaysAgo) {
          paidAmountLast7Days += inv.amount;
          paidInvoicesLast7Days++;
        }
      } else if (inv.status === "Unpaid") {
        // Unpaid Amount globally
        unpaidAmountTotal += inv.amount;
        unpaidInvoicesCount++;
      }
    });

    return success(
      res,
      {
        recentTransactions: recentTransactionsCount,
        totalInvoices,
        processedInvoices,
        paidAmountLast7Days,
        paidInvoicesCountLast7Days: paidInvoicesLast7Days,
        unpaidAmountTotal,
        unpaidInvoicesCount
      },
      "Invoice stats fetched successfully",
      200
    );
  } catch (err) {
    next(err);
  }
};
