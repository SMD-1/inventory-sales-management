import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.pre("save", function (next) {
  if (this.isNew || !this.dueDate) {
    const creationDate = this.createdAt || new Date();
    const futureDate = new Date(creationDate);
    futureDate.setDate(futureDate.getDate() + 7);
    this.dueDate = futureDate;
  }
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
