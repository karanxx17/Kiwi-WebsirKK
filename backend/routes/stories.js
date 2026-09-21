const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  getAllStories,
  createStory,
  updateStory,
  deleteStory,
  markSeen,
} = require("../controllers/storyController");

const router = express.Router();

router.get("/", getAllStories);
router.post("/", authMiddleware, createStory);
router.put("/:id", authMiddleware, updateStory);
router.delete("/:id", authMiddleware, deleteStory);
router.post("/:id/seen", authMiddleware, markSeen);

module.exports = router;
