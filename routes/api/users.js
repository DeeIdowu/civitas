const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const Bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");

//for user info from User Schema
const User = require("../../models/User");

//@route  POST api/users
//@desc   To register user, sending data from schema to this route
//@access Public via middleware

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include valid e-mail").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //to send above error from check array
    }
    //to acquire user info
    const { name, email, password } = req.body;

    //creating a query to find a user via asynch await
    try {
      //See if user exists, send an error so theres no more than one of the same emails
      let user = await User.findOne({ email });

      if (user) {
        //bad request
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      //Get users gravatar based on email
      const avatar = gravatar.url(email, {
        s: "200", //size of user icon/avatar
        r: "pg", //no xxx
        d: "mm"
      });

      //create instance of a user registered:
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encrypt the password via Bcrypt before saving new user
      const salt = await Bcrypt.genSalt(10); //10 encryption iterations

      user.password = await Bcrypt.hash(password, salt); //takes in password and salt

      //to save user to database via promise:

      await user.save();

      //Return JsonWebToken, for authentication and allowing user to be logged in immediately.
      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
