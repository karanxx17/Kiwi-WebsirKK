const express = require("express");
const { authMiddleware, optionalAuth } = require("../middleware/auth");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", optionalAuth, createPost);   // admin can post without JWT
router.put("/:id", optionalAuth, updatePost);
router.delete("/:id", optionalAuth, deletePost);
router.post("/:id/like", optionalAuth, likePost);
router.post("/:id/comment", optionalAuth, addComment);

module.exports = router;
