const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const httpStatusText = require("../utils/httpStatusText");
const generateJWT = require("../utils/generateJWT");

const getAllUsers = async (req, res) => {
  const users = await userModel.find({}, { __v: false });
  res.json({ status: httpStatusText.SUCCESS, data: users });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        role 
      });

    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role });
    newUser.token = token;

    await newUser.save();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: newUser });
  } catch (error) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    const matchedPassword = await bcrypt.compare( password,user.password);

    if (user && matchedPassword) {
      const token = await generateJWT({ email: user.email,
        id: user._id,
        role: user.role });  

      return res.json({
        status: httpStatusText.SUCCESS,
        message: "Logged in successfuly",
        data: {"token": token},
      });
    } else {
      return res.status(401).json({
        status: httpStatusText.ERROR,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: "Invalid email or password",
    });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
