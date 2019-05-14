const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const config = require("config");

const User = require("../../models/User");

//@route  GET api/auth
//@desc   This is to test the route
//@access Public via middleware

//to return user data:
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //so password is not returned
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST api/auth
//@desc   Authenticate user & get token
//@access Public

router.post(
  "/",
  [
    check("email", "Please include valid e-mail").isEmail(),
    check("password", "Password is required.").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //to send above error from check array
    }
    //to acquire user info
    const { email, password } = req.body;

    //creating a query to find a user via asynch await
    try {
      //See if user exists, send an error so theres no more than one of the same emails
      let user = await User.findOne({ email });

      if (!user) {
        //bad request
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //Match email and password:
      //via compare method from bcrypt:
      const isMatch = await bcrypt.compare(password, user.password);

      //Checking if its not a match:
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //Return JsonWebToken, for authentication and allowing user to be logged in immediately and access protected routes.
      //Done via promise
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); //default: 3600 for session expiry
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
