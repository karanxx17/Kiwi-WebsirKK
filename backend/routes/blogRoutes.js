const express = require("express");
const formidable = require("express-formidable");

const {
  addBlogController,
  updateBlogController,
  getAllBlogsController,
  getSingleBlogController,
  getBlogPhotoController,
  deleteBlogController,
  getBlogBySlugController,
} = require("../controllers/blogcontroller");

const router = express.Router();

router.post("/add-blog", formidable(), addBlogController);
router.put("/update-blog/:id", formidable(), updateBlogController);
router.get("/get-all-blogs", getAllBlogsController);
router.get("/get-single-blog/:id", getSingleBlogController);
router.get("/get-blog-photo/:id", getBlogPhotoController);
router.delete("/delete-blog/:id", deleteBlogController);
router.get("/get-blog-by-slug/:slug", getBlogBySlugController);

module.exports = router;