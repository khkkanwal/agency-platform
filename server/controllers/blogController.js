import Blog from "../models/BlogModel.js";

const blogController = {};
// Create a new blog post
blogController.createBlog = async (req, res) => {
  try {
    const { title, content, status, tags } = req.body;

    const newBlog = new Blog({
      title,
      content,
      status: status || "draft",
      tags: tags || [],
      author: req.user._id, // ✅ from logged-in user
    });

    const savedBlog = await newBlog.save();

    const populated = await Blog.findById(savedBlog._id).populate(
      "author",
      "name email",
    );

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all blog posts
blogController.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single blog post by ID
blogController.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a blog post by ID
blogController.updateBlog = async (req, res) => {
  try {
    const { title, content, status, tags } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(content && { content }),
        ...(status && { status }),
        ...(tags && { tags }),
      },
      { new: true },
    ).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a blog post by ID
blogController.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default blogController;
