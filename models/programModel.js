import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
  },
  { timestamps: true }
);

const Program =
  mongoose.models.Program || mongoose.model("Program", programSchema);

export default Program;