const mongoose = require("mongoose");

const compraSchema = mongoose.Schema(
  {
    userId: {type: String, required: true },
    cartId: {type: String, required: true },
    amount: {type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Compra", compraSchema);