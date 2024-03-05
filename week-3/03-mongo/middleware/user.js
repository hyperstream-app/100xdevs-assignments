const { User } = require("../db");

function userMiddleware(req, res, next) {
  const { username, password } = req.headers;

  User.findOne({ username, password }).then((data) => {
    if (!data)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user!" });

    next();
  });
}

module.exports = userMiddleware;
