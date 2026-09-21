const Story = require("../models/Story");

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({
      expiresAt: { $gt: new Date() }
    })
      .populate("author")
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { image, caption, authorId, onModel } = req.body;

    const finalAuthorId = authorId || req.userId;
    const finalModel = onModel || 'User';

    const story = new Story({
      author: finalAuthorId,
      onModel: finalModel,
      image,
      caption,
    });

    await story.save();
    const populatedStory = await Story.findById(story._id).populate("author");

    res.status(201).json({ message: "Story created successfully", story: populatedStory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Only creator (admin) can update (since only admin uses this backend currently)
    story.caption = caption || story.caption;
    await story.save();

    res.json({ message: "Story updated successfully", story });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    await story.deleteOne();
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markSeen = async (req, res) => {
  try {
    // Basic implementation for now
    res.json({ message: "Story marked as seen" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
