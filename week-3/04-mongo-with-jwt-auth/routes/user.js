const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config");
const { default: mongoose } = require("mongoose");
const router = Router();

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { username, password },
      {},
      { upsert: true }
    );
    if (user)
      return res
        .status(403)
        .json({ success: false, message: "Username already exists" });
    return res.json({ success: true, message: "User created successfully" });
  } catch {
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

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt1Y2stbWluaXN0ZXIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDk3ODg0MTl9.dbji_TN6_0IhbRkpHAkJYdnhxm8g8cDvm1gMu0QqiKw

  const { isAdmin } = user;
  const token = jwt.sign({ username, isAdmin }, JWT_SECRET);
  return res.json({ success: true, message: token });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  return res.json({ success: true, message: courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.username;

  try {
    const user = await User.findOne({ username });

    if (
      user.purchased_courses.includes(new mongoose.Types.ObjectId(courseId))
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Course already purchased" });
    }

    user.purchased_courses.push(courseId);
    await user.save();
    return res.json({
      success: true,
      message: "Course purchased successfully",
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server crashed" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.username;

  let purchased_courses;
  try {
    let user = await User.findOne({ username });
    purchased_courses = user.purchased_courses;
  } catch {
    return res.status(500).json({ success: false, message: "Server crashed" });
  }

  try {
    let courses = [];
    const promises = purchased_courses?.map(async (courseId) => {
      return await Course.findById(courseId);
    });
    courses = await Promise.all(promises);
    return res.json({
      success: true,
      message: courses,
    });
  } catch {
    return res.status(500).json({ success: false, message: "Server crashed" });
  }
});

module.exports = router;
