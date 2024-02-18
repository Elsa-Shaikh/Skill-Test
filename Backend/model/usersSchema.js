import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const users = new mongoose.model("users", userSchema);
export default users;
