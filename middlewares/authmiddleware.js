const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await usermodel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      req.user = user; // Attach user to the request
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Unauthenticated" });
    }
  };
  