const Post = require("../models/Post");
const User = require("../models/User");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { caption, image, location, badge, tags, music, authorId, onModel } = req.body;

    let finalAuthorId = authorId;
    let finalOnModel = onModel || 'User';

    // If no specific author provided, use logged-in user or default admin
    if (!finalAuthorId) {
      finalAuthorId = req.userId;
      if (!finalAuthorId) {
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
        const admin = await User.findOne({ email: adminEmail });
        if (!admin) {
          return res.status(400).json({ message: "No author found. Please log in." });
        }
        finalAuthorId = admin._id;
        finalOnModel = 'User';
      }
    }

    const post = new Post({
      author: finalAuthorId,
      onModel: finalOnModel,
      caption,
      image,
      location,
      badge,
      tags: tags || [],
      music,
    });

    await post.save();
    await post.populate("author");

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, location, badge, tags, music } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.caption = caption || post.caption;
    post.location = location || post.location;
    post.badge = badge || post.badge;
    post.tags = tags || post.tags;
    post.music = music || post.music;

    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { deviceId } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.userId) {
      // Logged-in user logic
      const isLiked = post.likedBy.includes(req.userId);
      if (isLiked) {
        post.likedBy = post.likedBy.filter((u) => u.toString() !== req.userId);
        post.likes--;
      } else {
        post.likedBy.push(req.userId);
        post.likes++;
      }
    } else if (deviceId) {
      // Guest (device-based) logic
      if (!post.likedByDevices) post.likedByDevices = [];
      const isLiked = post.likedByDevices.includes(deviceId);
      if (isLiked) {
        post.likedByDevices = post.likedByDevices.filter((d) => d !== deviceId);
        post.likes--;
      } else {
        post.likedByDevices.push(deviceId);
        post.likes++;
      }
    } else {
      return res.status(400).json({ message: "No user identity provided" });
    }

    await post.save();
    res.json({ message: "Like updated", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, deviceId, authorId, onModel } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Use specific author if provided (Admin panel)
    let finalAuthorId = authorId || req.userId || null;
    let finalOnModel = onModel || (req.userId ? 'User' : 'User');

    post.comments.push({
      author: finalAuthorId,
      onModel: finalOnModel,
      deviceId: deviceId || null,
      text,
    });

    await post.save();
    res.json({ message: "Comment added", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
