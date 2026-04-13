const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    method: {
      type: String,
      enum: ["card", "upi", "cod"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cod_pending", "failed"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
