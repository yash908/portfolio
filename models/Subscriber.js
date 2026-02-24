import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);
