import React, { useEffect, useRef, useState } from "react";
import { useHeader } from "../../contexts/header-context";
import {
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle,
  X,
  Download,
  Printer,
  Info,
} from "lucide-react";
import { get, patch, del } from "../../utils/api";
import { toast } from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import "./invoice.css";

const invoiceData = [
  {
    id: "INV-1001",
    ref: "MongoDB Object ID",
    amount: "2,450",
    status: "Paid",
    date: "02-Apr-25",
  },
  {
    id: "INV-1002",
    ref: "MongoDB Object ID",
    amount: "1,850",
    status: "Unpaid",
    date: "05-Apr-25",
  },
  {
    id: "INV-1003",
    ref: "MongoDB Object ID",
    amount: "3,620",
    status: "Paid",
    date: "02-Apr-25",
  },
  {
    id: "INV-1004",
    ref: "MongoDB Object ID",
    amount: "950",
    status: "Unpaid",
    date: "02-Apr-25",
  },
  {
    id: "INV-1005",
    ref: "MongoDB Object ID",
    amount: "4,100",
    status: "Paid",
    date: "09-Apr-25",
  },
  {
    id: "INV-1006",
    ref: "MongoDB Object ID",
    amount: "2,990",
    status: "Unpaid",
    date: "10-Apr-25",
  },
  {
    id: "INV-1007",
    ref: "MongoDB Object ID",
    amount: "5,600",
    status: "Paid",
    date: "10-Apr-25",
  },
  {
    id: "INV-1008",
    ref: "MongoDB Object ID",
    amount: "1,750",
    status: "Paid",
    date: "10-Apr-25",
  },
  {
    id: "INV-1009",
    ref: "MongoDB Object ID",
    amount: "3,250",
    status: "Unpaid",
    date: "13-Apr-25",
  },
];

const TAX_RATE = 0.1;

const calculateInvoiceTotals = (invoice) => {
  const items = Array.isArray(invoice?.items) ? invoice.items : [];
  const computedSubtotal = items.reduce((sum, item) => {
    const quantity = Number(item?.quantity) || 0;
    const price = Number(item?.price) || 0;
    return sum + quantity * price;
  }, 0);
  const fallbackSubtotal = Number(invoice?.amount) || 0;
  const subtotal = computedSubtotal > 0 ? computedSubtotal : fallbackSubtotal;
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount;

  return { items, subtotal, taxAmount, total };
};

const Invoice = () => {
  const { setTitle, searchQuery } = useHeader();
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({
    recentTransactions: 0,
    totalInvoices: 0,
    processedInvoices: 0,
    paidAmountLast7Days: 0,
    paidInvoicesCountLast7Days: 0,
    unpaidAmountTotal: 0,
    unpaidInvoicesCount: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const printRef = useRef(null);
  const invoiceTotals = selectedInvoice
    ? calculateInvoiceTotals(selectedInvoice)
    : null;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: (() => {
      if (!selectedInvoice) return "Invoice";
      const baseName = "Customer";
      const invoiceNumber = (selectedInvoice.invoiceId || "").trim() || "Invoice";
      return `${baseName}-${invoiceNumber}`;
    })(),
  });

  const handleDownloadPdf = handlePrint;

  useEffect(() => {
    setTitle("Invoice");
    fetchStats();
  }, [setTitle]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchInvoices(1);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchStats = async () => {
    try {
      const res = await get("/api/invoices/invoice-stats");
      setStats(res.data || res);
    } catch (err) {
      console.error("Failed to fetch invoice stats", err);
    }
  };

  const fetchInvoices = async (page = currentPage) => {
    try {
      let url = `/api/invoices?page=${page}&limit=${itemsPerPage}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      
      const res = await get(url);
      const data = res.data?.invoices || res.invoices || [];
      const pagination = res.data?.pagination || res.pagination || { totalPages: 1 };
      
      setInvoices(data);
      setTotalPages(pagination.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      toast.error("Failed to fetch invoices");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await patch(`/api/invoices/${id}/status`);
      const updatedInvoice = res.data?.invoice || res.invoice;

      setInvoices((prev) =>
        prev.map((inv) => (inv._id === id ? updatedInvoice : inv)),
      );
      
      // Refresh stats to update "Processed Invoices" count
      fetchStats();
      
      toast.success(`Status updated to ${updatedInvoice.status}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (invoiceToDelete) {
      try {
        await del(`/api/invoices/${invoiceToDelete}`);
        
        setInvoices((prev) => prev.filter((inv) => inv._id !== invoiceToDelete));
        setInvoiceToDelete(null);
        
        // Refresh stats after deletion
        fetchStats();
        toast.success("Invoice deleted successfully");
      } catch (err) {
        toast.error("Failed to delete invoice");
      }
    }
  };
  console.log("Selected Invoice", selectedInvoice);

  return (
    <div className="invoice-page">
      {/* Overall Invoice Section */}
      <div className="overall-invoice">
        <h3>Overall Invoice</h3>
        <div className="status-grid">
          <div className="status-card">
            <span className="label">Recent Transactions</span>
            <div className="status-row">
              <span className="main-val">{stats.recentTransactions}</span>
              <span className="sub-val">Last 7 days</span>
            </div>
          </div>

          <div className="status-card">
            <span className="label">Total Invoices</span>
            <div className="sub-info-row">
              <div className="sub-info">
                <span className="val">{stats.totalInvoices}</span>
                <span className="text">Total Till Date</span>
              </div>
              <div className="sub-info">
                <span className="val">{stats.processedInvoices}</span>
                <span className="text">Processed</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <span className="label">Paid Amount</span>
            <div className="sub-info-row">
              <div className="sub-info">
                <span className="val">₹{stats.paidAmountLast7Days?.toLocaleString()}</span>
                <span className="text">Last 7 days</span>
              </div>
              <div className="sub-info">
                <span className="val">{stats.paidInvoicesCountLast7Days}</span>
                <span className="text">Paid Invoices</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <span className="label">Unpaid Amount</span>
            <div className="sub-info-row">
              <div className="sub-info">
                <span className="val">₹{stats.unpaidAmountTotal?.toLocaleString()}</span>
                <span className="text">Total Pending</span>
              </div>
              <div className="sub-info">
                <span className="val">{stats.unpaidInvoicesCount}</span>
                <span className="text">Invoices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices List Section */}
      <div className="invoices-list-container">
        <div className="list-header">
          <h3>Invoices List</h3>
        </div>
        <div className="invoices-table-wrapper">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Reference Number</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, index) => (
                <tr key={inv._id || index}>
                  <td className="invoice-id">{inv.invoiceId}</td>
                  <td className="ref-num">{inv._id}</td>
                  <td>₹ {inv.amount?.toLocaleString()}</td>
                  <td
                    className={
                      inv.status === "Paid" ? "status-paid" : "status-unpaid"
                    }
                  >
                    {inv.status}
                  </td>
                  <td className="date-cell">
                    <div className="date-content">
                      <span>
                        {inv.dueDate
                          ? new Date(inv.dueDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "2-digit",
                            }).replace(/ /g, "-")
                          : "-"}
                      </span>
                      <button
                        className="more-btn"
                        onClick={() => {
                          setOpenMenuId(openMenuId === inv._id ? null : inv._id);
                          setInvoiceToDelete(null);
                        }}
                      >
                        <MoreVertical size={16} color="#858D9D" />
                      </button>
                    </div>
                    <div className="mobile-actions">
                      <button 
                        className="mobile-action-btn view" 
                        onClick={() => setSelectedInvoice(inv)}
                      >
                        <Eye size={16} color="#000" />
                      </button>
                      <button 
                        className="mobile-action-btn delete" 
                        onClick={() => setInvoiceToDelete(inv._id)}
                      >
                        <Trash2 size={16} color="#000" />
                      </button>
                    </div>

                    {openMenuId === inv._id && invoiceToDelete !== inv._id && (
                      <>
                        <div
                          className="list-overlay"
                          onClick={() => setOpenMenuId(null)}
                        ></div>
                        <div
                          className={`action-popover ${inv.status === "Unpaid" ? "status-toggle-popover" : ""}`}
                        >
                          {inv.status === "Unpaid" ? (
                            <button
                              className="status-btn-toggle to-paid"
                              onClick={() => handleToggleStatus(inv._id)}
                            >
                              <CheckCircle size={14} />
                              Paid
                            </button>
                          ) : (
                            <div className="menu-options">
                              <button
                                className="menu-item"
                                onClick={() => {
                                  setSelectedInvoice(inv);
                                  setOpenMenuId(null);
                                }}
                              >
                                <Eye size={16} color="#00BFFF" />
                                View Invoice
                              </button>
                                <button
                                  className="menu-item delete"
                                  onClick={() => {
                                    setInvoiceToDelete(inv._id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <Trash2 size={16} color="#DA3E33" />
                                  Delete
                                </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {invoiceToDelete === inv._id && (
                      <>
                        <div
                          className="list-overlay"
                          onClick={() => setInvoiceToDelete(null)}
                        ></div>
                        <div
                          className="delete-action-popover"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p>this invoice will be deleted.</p>
                          <div className="delete-modal-actions">
                            <button
                              className="delete-cancel-btn"
                              onClick={() => setInvoiceToDelete(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="delete-confirm-btn"
                              onClick={confirmDelete}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                    {searchQuery ? "No matching invoices found." : "No invoices found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button 
            className="page-btn" 
            onClick={() => fetchInvoices(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="page-btn" 
            onClick={() => fetchInvoices(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* View Invoice Modal */}
      {selectedInvoice && (
        <div
          className="modal-overlay-blur"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="invoice-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="invoice-inner-paper" ref={printRef}>
              <div className="invoice-sticky-header">
                <div className="invoice-header-title">
                  <h1>INVOICE</h1>
                  <button
                    className="mobile-close-btn"
                    onClick={() => setSelectedInvoice(null)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="invoice-meta-top">
                  <div className="billed-section">
                    <h4>Billed to</h4>
                    <p>
                      <strong>Company Name</strong>
                    </p>
                    <p>Company address</p>
                    <p>City, Country - 00000</p>
                  </div>
                  <div className="business-section">
                    <h4>Business address</h4>
                    <p>City, State, IN - 000 000</p>
                    <p>TAX ID D0XXXXX1234X0XX</p>
                  </div>
                </div>
              </div>

              <div className="invoice-main-grid">
                <div className="invoice-info-col">
                  <div className="info-item">
                    <h4>Invoice #</h4>
                    <p>{selectedInvoice.invoiceId}</p>
                  </div>
                  <div className="info-item">
                    <h4>Invoice date</h4>
                    <p>{selectedInvoice.createdAt ? new Date(selectedInvoice.createdAt).toLocaleDateString() : "-"}</p>
                  </div>
                  <div className="info-item">
                    <h4>Reference</h4>
                    <p>{selectedInvoice._id}</p>
                  </div>
                  <div className="info-item">
                    <h4>Due date</h4>
                    <p>{selectedInvoice.dueDate ? new Date(selectedInvoice.dueDate).toLocaleDateString() : "-"}</p>
                  </div>
                </div>

                <div className="invoice-right-col">
                  <div className="invoice-items-col">
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Products</th>
                          <th className="qty-cell">Qty</th>
                          <th className="price-cell">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceTotals?.items?.length ? (
                          invoiceTotals.items.map((item, index) => (
                            <tr key={item.productId || `${item.productName}-${index}`}>
                              <td>{item.productName || "-"}</td>
                              <td className="qty-cell">{item.quantity ?? "-"}</td>
                              <td className="price-cell">
                                {Number(item.price || 0).toLocaleString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
                              No items available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <div className="invoice-summary">
                      <div className="summary-row">
                        <div className="sub-total">
                          <span>Subtotal</span>
                          <span>₹{Number(invoiceTotals?.subtotal || 0).toLocaleString()}</span>
                        </div>
                        <div className="summary-tax">
                          <span>Tax (10%)</span>
                          <span>₹{Number(invoiceTotals?.taxAmount || 0).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="summary-total">
                        <span>Total due</span>
                        <span>₹{Number(invoiceTotals?.total || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="invoice-footer-note">
                    <Info size={14} />
                    <span>
                      Please pay within 7 days of receiving this Invoice.
                    </span>
                  </div>
                </div>
              </div>

              <div className="invoice-contact-footer">
                <span>www.recehtol.inc</span>
                <span>+91 00000 00000</span>
                <span>hello@email.com</span>
              </div>
            </div>

            <div className="modal-side-actions">
              <button
                className="action-circle-btn close"
                onClick={() => setSelectedInvoice(null)}
              >
                <X size={24} />
              </button>
              <button 
                className="action-circle-btn download"
                onClick={handleDownloadPdf}
                title="Download as PDF"
              >
                <Download size={24} />
              </button>
              <button 
                className="action-circle-btn print"
                onClick={handlePrint}
                title="Print Invoice"
              >
                <Printer size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
