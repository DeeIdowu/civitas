const express = require("express");
const router = express.Router();

//@route  GET api/profile
//@desc   This is to test the route
//@access Public via middleware

router.get("/", (req, res) => res.send("User route"));

module.exports = router;
