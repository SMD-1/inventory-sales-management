import React, { useEffect, useState } from "react";
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

const Invoice = () => {
  const { setTitle } = useHeader();
  const [invoices, setInvoices] = useState(invoiceData);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  useEffect(() => {
    setTitle("Invoice");
  }, [setTitle]);

  const handleToggleStatus = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? { ...inv, status: inv.status === "Paid" ? "Unpaid" : "Paid" }
          : inv,
      ),
    );
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    if (invoiceToDelete) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceToDelete));
      setInvoiceToDelete(null);
    }
  };

  return (
    <div className="invoice-page">
      {/* Overall Invoice Section */}
      <div className="overall-invoice">
        <h3>Overall Invoice</h3>
        <div className="status-grid">
          <div className="status-card">
            <span className="label">Recent Transactions</span>
            <div className="status-row">
              <span className="main-val">24</span>
              <span className="sub-val">Last 7 days</span>
            </div>
          </div>

          <div className="status-card">
            <span className="label">Total Invoices</span>
            <div className="sub-info-row">
              <div className="sub-info">
                <span className="val">152</span>
                <span className="text">Total Till Date</span>
              </div>
              <div className="sub-info">
                <span className="val">138</span>
                <span className="text">Processed</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <span className="label">Paid Amount</span>
            <div className="sub-info-row">
              <div className="sub-info">
                <span className="val">₹1,20,500</span>
                <span className="text">Last 7 days</span>
              </div>
              <div className="sub-info">
                <span className="val">97</span>
                <span className="text">customers</span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <span className="label">Unpaid Amount</span>
            <div className="sub-info-row">
              <div className="sub-info">
                <span className="val">₹45,800</span>
                <span className="text">Total Pending</span>
              </div>
              <div className="sub-info">
                <span className="val">18</span>
                <span className="text">Customers</span>
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
                <tr key={index}>
                  <td className="invoice-id">{inv.id}</td>
                  <td className="ref-num">{inv.ref}</td>
                  <td>₹ {inv.amount}</td>
                  <td
                    className={
                      inv.status === "Paid" ? "status-paid" : "status-unpaid"
                    }
                  >
                    {inv.status}
                  </td>
                  <td className="date-cell">
                    <div className="date-content">
                      <span>{inv.date}</span>
                      <button
                        className="more-btn"
                        onClick={() => {
                          setOpenMenuId(openMenuId === inv.id ? null : inv.id);
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
                        onClick={() => setInvoiceToDelete(inv.id)}
                      >
                        <Trash2 size={16} color="#000" />
                      </button>
                    </div>

                    {openMenuId === inv.id && invoiceToDelete !== inv.id && (
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
                              onClick={() => handleToggleStatus(inv.id)}
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
                                  setInvoiceToDelete(inv.id);
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

                    {invoiceToDelete === inv.id && (
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
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn">Previous</button>
          <span className="pagination-info">Page 1 of 10</span>
          <button className="page-btn">Next</button>
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
            <div className="invoice-inner-paper">
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
                    <p>{selectedInvoice.id}</p>
                  </div>
                  <div className="info-item">
                    <h4>Invoice date</h4>
                    <p>01-Apr-2025</p>
                  </div>
                  <div className="info-item">
                    <h4>Reference</h4>
                    <p>INV-057</p>
                  </div>
                  <div className="info-item">
                    <h4>Due date</h4>
                    <p>{selectedInvoice.date}</p>
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
                        <tr>
                          <td>Basmati Rice (5kg)</td>
                          <td className="qty-cell">1</td>
                          <td className="price-cell">1,090</td>
                        </tr>
                        <tr>
                          <td>Aashirvaad Atta (10kg)</td>
                          <td className="qty-cell">1</td>
                          <td className="price-cell">545</td>
                        </tr>
                        <tr>
                          <td>Fortune Sunflower Oil (5L)</td>
                          <td className="qty-cell">1</td>
                          <td className="price-cell">1,090</td>
                        </tr>
                        <tr>
                          <td>Amul Toned Milk (1L)</td>
                          <td className="qty-cell">5</td>
                          <td className="price-cell">273</td>
                        </tr>
                        <tr>
                          <td>Fortune Sunflower Oil (5L)</td>
                          <td className="qty-cell">1</td>
                          <td className="price-cell">1,090</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="invoice-summary">
                      <div className="summary-row">
                        <div className="sub-total">
                          <span>Subtotal</span>
                          <span>₹5,090</span>
                        </div>
                        <div className="summary-tax">
                          <span>Tax (10%)</span>
                          <span>₹510</span>
                        </div>
                      </div>
                      <div className="summary-total">
                        <span>Total due</span>
                        <span>₹{selectedInvoice.amount}</span>
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
              <button className="action-circle-btn download">
                <Download size={24} />
              </button>
              <button className="action-circle-btn print">
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
