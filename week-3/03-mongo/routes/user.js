const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  let data = await User.findOne({ username });
  if (!!data) {
    return res
      .status(404)
      .json({ success: false, message: "This account already exists!" });
  }

  data = await User.create({ username, password });
  if (!data)
    return res.status(500).json({ success: false, message: "Server crashed!" });

  res.json({ success: true, message: "User created successfully" });
});

router.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  return res.json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const { username, password } = req.headers;
  const data = await Course.findById(courseId);

  if (!data)
    return res
      .status(404)
      .json({ success: false, message: "Course with this ID does not exist!" });

  User.findOneAndUpdate(
    { username, password },
    {
      $push: {
        purchased_courses: courseId,
      },
    }
  ).then((response) => {
    if (!response)
      return res
        .status(500)
        .json({ success: false, message: "Server crashed!" });

    console.log(response);

    return res.json({
      success: true,
      message: "Course purchased successfully",
    });
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  const { username, password } = req.headers;
  let purchasedCourses = [];
  User.findOne({ username, password })
    .then((data) => {
      return data.purchased_courses;
    })
    .then((courses) => {
      const promises = courses.map((course) => {
        return Course.findById(course);
      });
      return Promise.all(promises);
    })
    .then((responseCourses) => {
      res.json(responseCourses);
    });
});

module.exports = router;
