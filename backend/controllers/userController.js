const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar, followersCount } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, avatar, followersCount },
      { new: true },
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { deviceId } = req.body;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.followedByDevices) user.followedByDevices = [];

    const index = user.followedByDevices.indexOf(deviceId);
    if (index === -1) {
      user.followedByDevices.push(deviceId);
      user.followersCount++;
    } else {
      user.followedByDevices.splice(index, 1);
      user.followersCount--;
    }

    await user.save();
    res.json({ followersCount: user.followersCount, isFollowed: index === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
