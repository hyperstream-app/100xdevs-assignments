const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config");

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  purchased_courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  User,
  Course,
};
