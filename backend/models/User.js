const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://via.placeholder.com/150" },
    bio: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    followersCount: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    followedByDevices: [{ type: String }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
