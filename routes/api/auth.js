const express = require("express");
const router = express.Router();

//@route  GET api/auth
//@desc   This is to test the route
//@access Public via middleware

router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
