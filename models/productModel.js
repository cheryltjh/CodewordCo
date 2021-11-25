const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, unique: true },
    description: { type: String },
    start: { type: String },
    end: { type: String },
    image: { type: String },
    price: { type: Number },
    seatsAvailable: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
