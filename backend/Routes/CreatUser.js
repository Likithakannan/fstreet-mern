const User = require("../models/User");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "ajfbhgiehfjghdoprkshf"

router.post(
  "/creatuser/",
  [
    body("email", "Invalid Email Id").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10)
      const secPassword = await bcrypt.hash(req.body.password,salt)

      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser/",
  [
    body("email", "Invalid Email Id").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let email = req.body.email;
      let userData = await User.findOne({email})
      if(!userData){
              return res
                .status(400)
                .json({ errors: 'Invalid Email address'});

      }
      const pwdCompare = bcrypt.compare(req.body.password, userData.password);
      if(!pwdCompare){
              return res
                .status(400)
                .json({ errors: 'Invalid Password'});
      }

      const data = {
        user : {
          id : userData.id
        }
      }
      const authToken = jwt.sign(data, secret)
      return res.json({ success: true, AuthToken: authToken });
      
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
