const Reel = require("../models/Reel");

exports.getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find()
      .populate("user", "name handle avatar verified")
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReel = async (req, res) => {
  try {
    const { image, caption, music } = req.body;

    const reel = new Reel({
      user: req.userId,
      image,
      caption,
      music,
    });

    await reel.save();
    await reel.populate("user", "name handle avatar verified");

    res.status(201).json({ message: "Reel created successfully", reel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReel = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, music } = req.body;

    const reel = await Reel.findById(id);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    if (reel.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    reel.caption = caption || reel.caption;
    reel.music = music || reel.music;

    await reel.save();
    res.json({ message: "Reel updated successfully", reel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReel = async (req, res) => {
  try {
    const { id } = req.params;
    const reel = await Reel.findById(id);

    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    if (reel.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await reel.deleteOne();
    res.json({ message: "Reel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeReel = async (req, res) => {
  try {
    const { id } = req.params;
    const reel = await Reel.findById(id);

    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    const isLiked = reel.likedBy.includes(req.userId);
    if (isLiked) {
      reel.likedBy = reel.likedBy.filter((u) => u.toString() !== req.userId);
      reel.likes--;
    } else {
      reel.likedBy.push(req.userId);
      reel.likes++;
    }

    await reel.save();
    res.json({ message: "Like updated", reel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const reel = await Reel.findById(id);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    reel.comments.push({
      user: req.userId,
      text,
    });

    await reel.save();
    res.json({ message: "Comment added", reel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.incrementViews = async (req, res) => {
  try {
    const { id } = req.params;
    const reel = await Reel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true },
    );

    res.json({ message: "View incremented", reel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
