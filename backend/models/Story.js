const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'onModel' },
    onModel: { type: String, required: true, enum: ['User', 'Employee'], default: 'User' },
    image: { type: String, required: true },
    caption: { type: String },
    expiresAt: { 
      type: Date, 
      default: () => new Date(+new Date() + 24*60*60*1000) // 24 hours from now
    },
  },
  { timestamps: true }
);

// Auto-delete stories after expiresAt
storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Story", storySchema);
