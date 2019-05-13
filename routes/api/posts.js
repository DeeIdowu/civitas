const express = require("express");
const router = express.Router();

//@route  GET api/posts
//@desc   This is to test the route
//@access Public via middleware

router.get("/", (req, res) => res.send("User route"));

module.exports = router;
