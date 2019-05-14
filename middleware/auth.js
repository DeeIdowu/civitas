const jwt = require("jsonwebtoken");
const config = require("config");

//middleware has access to req,res and next(callback ran after done)
module.exports = function(req, res, next) {
  //Get the token from the header/from request
  const token = req.header("x-auth-token");
  // Check if not token:
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); //not authorized
  }
  //Verify token:
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //request object and assign value to user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
