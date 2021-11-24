const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
