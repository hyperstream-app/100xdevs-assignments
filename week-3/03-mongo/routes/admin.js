const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  let data = await Admin.findOne({ username });
  if (!!data) {
    return res
      .status(404)
      .json({ success: false, message: "This account already exists!" });
  }

  data = await Admin.create({ username, password });
  if (!data)
    return res.status(500).json({ success: false, message: "Server crashed!" });

  res.json({ success: true, message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;

  const course = new Course();
  course.title = title;
  course.description = description;
  course.price = price;
  course.imageLink = imageLink;

  const data = await course.save();
  if (!data)
    return res.status(500).json({ success: false, message: "Server crashed!" });

  return res.json({
    success: true,
    message: "Course created successfully",
    courseId: data._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  return res.json({ courses });
});

module.exports = router;
