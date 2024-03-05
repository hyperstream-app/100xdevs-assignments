const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;
  Admin.findOne({ username, password }).then((data) => {
    if (!data)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized account!" });

    next();
  });
}

module.exports = adminMiddleware;
