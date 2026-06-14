import express from "express";
import path from "path";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { connectMongo } from "./db/index.js";
import { checkForAuthCookie } from "./middlewares/auth.middleware.js";
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

app.get("/", (req, res) => {
  res.render("home.view.ejs", {
    user: req.user,
  });
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
