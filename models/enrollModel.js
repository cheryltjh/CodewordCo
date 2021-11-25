const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    product: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);
const Enroll = mongoose.model('Enroll', enrollSchema);
module.exports = Enroll;