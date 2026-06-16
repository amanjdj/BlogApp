import express from "express";
import path from "path";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import cookieParser from "cookie-parser";
import { connectMongo } from "./db/index.js";
import { checkForAuthCookie } from "./middlewares/auth.middleware.js";
import { Blog } from "./models/blog.model.js";
const app = express();
const PORT = 8003;

connectMongo("mongodb://localhost:27017/blogify")
  .then((e) => console.log("Mongodb Connected"))
  .catch((err) => {
    console.log(err.message);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort();
  if (!req.user) return res.render("home.view.ejs", { blogs: allBlogs });
  res.render("home.view.ejs", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
