import express from "express";
import path from "path";

const app = express();
const PORT = 8003;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home.view.ejs");
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
