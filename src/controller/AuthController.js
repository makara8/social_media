const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    const { username, email, password, address, work, profile_picture_path } =
      req.body;
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(password, salt);
    const result = new User({
      username,
      email,
      password: hashPwd,
      address,
      work,
      profile_picture_path,
    });
    try {
      await result.save();
      res.json(result);
    } catch (error) {
      res.json(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.json({ message: "unauthorizess" });
      const comparePwd = bcrypt.compare(password, user.email);
      if (!comparePwd) return res.json({ message: "pwd not correct" });
      const token = jwtToken(user);
      res.json({
        user,
        token,
        message: "you are success",
      });
    } catch (error) {
      res.json(error.message);
    }
  },
  checkAuth: async (req, res) => {
    try {
      const id = req.user._id;
      const user = await User.findById(id);
      res.json(user);
    } catch (err) {
      res.json("Unauthorize");
    }
  },
};

function jwtToken(user) {
  return jwt.sign({ data: user }, process.env.JWT_KEY, { expiresIn: "5h" });
}

module.exports = authController;
