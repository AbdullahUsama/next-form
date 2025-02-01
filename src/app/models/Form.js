// models/FormData.js
import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists to avoid redefining it
const FormData =
  mongoose.models.FormData || mongoose.model("FormData", formDataSchema);

export default FormData;
