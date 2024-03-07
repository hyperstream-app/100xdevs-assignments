const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const isAdmin = true;

  try {
    let user = await User.findOneAndUpdate(
      { username, password, isAdmin },
      {},
      { upsert: true }
    );
    if (user)
      return res
        .status(404)
        .json({ success: false, message: "User already exists" });
    return res.json({ success: true, message: "Admin created successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Server crashed" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  let user;
  try {
    user = await User.findOne({ username, password });
    if (!user)
      return res
        .status(411)
        .json({ success: false, message: "Invalid username/password" });
  } catch {
    return res.status(500).json({ success: false, message: "Server crashed" });
  }

  const { isAdmin } = user;
  const token = jwt.sign({ username, isAdmin }, JWT_SECRET);
  return res.json({ success: true, message: token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, imageLink, price } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      imageLink,
      price,
    });

    return res.json({ success: true, message: course._id });
  } catch {
    return res.status(500).json({ success: false, message: "Server crashed" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  return res.json({ success: true, message: courses });
});

module.exports = router;
