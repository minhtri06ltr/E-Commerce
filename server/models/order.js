const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      //ref: foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: { type: String, required: true },
        color: { type: String, required: true },
        img: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "Order",
  orderSchema,
);
