const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Middleware for handling auth
function userMiddleware(req, res, next) {
  if (!req.headers.authorization)
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized user!" });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.username)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized user!" });

    req.username = decoded.username;
    next();
  } catch {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized user!" });
  }
}

module.exports = userMiddleware;
