const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//TODO: Expiration check

const protect = async (req, res, next) => {
  let token;
  // console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // console.log("inside try");
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "secret"); 
      // console.log(decoded);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401).json({error:error, message:"Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({error:"No token"});
  }
};

module.exports = protect;
