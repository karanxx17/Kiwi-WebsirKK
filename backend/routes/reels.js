const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  getAllReels,
  createReel,
  updateReel,
  deleteReel,
  likeReel,
  addComment,
  incrementViews,
} = require("../controllers/reelController");

const router = express.Router();

router.get("/", getAllReels);
router.post("/", authMiddleware, createReel);
router.put("/:id", authMiddleware, updateReel);
router.delete("/:id", authMiddleware, deleteReel);
router.post("/:id/like", authMiddleware, likeReel);
router.post("/:id/comment", authMiddleware, addComment);
router.post("/:id/view", incrementViews);

module.exports = router;
