const slugify = require("slugify");
const Blog = require("../models/blogModel");
const fs = require("fs");

/**
 * CREATE BLOG
 */
exports.addBlogController = async (req, res) => {
  try {
    const { title, excerpt, content, author } = req.fields;
    const { photo } = req.files;

    let slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // handle duplicate slug
    let slugExists = await Blog.findOne({ slug });
    let count = 1;

    while (slugExists) {
      slug = `${slug}-${count}`;
      slugExists = await Blog.findOne({ slug });
      count++;
    }

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      author,
    });

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Add Blog",
      error: error.message,
    });
  }
};

/**
 * UPDATE BLOG
 */
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, author } = req.fields;
    const { photo } = req.files;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slugExists = await Blog.findOne({
      slug,
      _id: { $ne: id },
    });

    let count = 1;
    while (slugExists) {
      slug = `${slug}-${count}`;
      slugExists = await Blog.findOne({
        slug,
        _id: { $ne: id },
      });
      count++;
    }

    blog.title = title;
    blog.slug = slug;
    blog.excerpt = excerpt;
    blog.content = content;
    blog.author = author;

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();

    res.json({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Update Blog",
      error: error.message,
    });
  }
};

/**
 * GET ALL BLOGS
 */
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find({}).select("-photo");

    res.json({
      success: true,
      totalCount: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Get Blogs",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE BLOG BY ID
 */
exports.getSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).select("-photo");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Get Blog",
      error: error.message,
    });
  }
};

/**
 * GET BLOG PHOTO
 */
exports.getBlogPhotoController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).select("photo");

    if (blog?.photo?.data) {
      res.set("Content-Type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }

    return res.status(404).json({ message: "Photo not found" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Get Blog Photo",
      error: error.message,
    });
  }
};

/**
 * DELETE BLOG
 */
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete Blog",
      error: error.message,
    });
  }
};

/**
 * GET BLOG BY SLUG
 */
exports.getBlogBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug: { $regex: `^${slug}$`, $options: "i" },
    }).select("-photo");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Get Blog",
      error: error.message,
    });
  }
};