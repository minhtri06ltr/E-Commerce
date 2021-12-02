const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      //ref: foreign key
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        size: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "Cart",
  cartSchema,
);
