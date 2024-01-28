// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  seva: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
