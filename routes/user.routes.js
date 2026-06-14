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
    const user = await User.matchPassword(email, password);

    console.log(user);

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signin.view.ejs", {
      error: "Incorrect Email or Password",
    });
  }
});

export default router;
