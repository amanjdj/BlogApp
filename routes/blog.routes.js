import { Router } from "express";
import multer from "multer";

import path from "path";
import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}--${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog.view.ejs", {
    user: req.user,
  });
});

router.get("/allBlogs", async (req, res) => {
  if (!req.user) return res.render("home.view.ejs", { blogs: [] });
  const allBlogs = await Blog.find({}).sort();
  return res.render("allBlogs.view.ejs", {
    user: req.user,
    blogs: allBlogs,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: re.bosy.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body, category, blogQuote } = req.body;
  const blog = await Blog.create({
    body,
    title,
    category,
    blogQuote,
    createdBy: req.user._id,
    coverImageURL: `uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  return res.render("blog.view.ejs", {
    user: req.user,
    blog,
  });
});

export default router;
