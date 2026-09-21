const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, refPath: 'comments.onModel' },
  onModel: { type: String, enum: ['User', 'Employee'] },
  deviceId: { type: String }, // For guest comments
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'onModel' },
    onModel: { type: String, required: true, enum: ['User', 'Employee'], default: 'User' },
    caption: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String },
    badge: { type: String },
    tags: [String],
    music: { type: String },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likedByDevices: [String], // Track guest likes
    comments: [commentSchema],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
