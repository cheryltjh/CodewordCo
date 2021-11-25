const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: { type: String, required: true },
    orderItems: [
      {
        product_id: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        },
    ],
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
