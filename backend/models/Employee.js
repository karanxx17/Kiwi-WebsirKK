const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/150" },
    bio: { type: String, default: "" },
    followersCount: { type: Number, default: 0 },
    followedByDevices: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
