import { Router } from "express";
import { User } from "../models/user.model.js";

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin.view.ejs");
});

router.get("/signup", (req, res) => {
  return res.render("signup.view.ejs");
});
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    // @ts-ignore - matchPasswordAndGenerateToken is a custom static on the User model
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signin.view.ejs", {
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

export default router;
