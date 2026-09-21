const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  getUserProfile,
  updateProfile,
  getAllUsers,
  followUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserProfile);
router.post("/:id/follow", followUser); // Public for guests
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
