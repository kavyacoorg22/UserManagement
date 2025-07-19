const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
require('dotenv').config();

const adminAuth = async (req, res, next) => {
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = adminAuth;
