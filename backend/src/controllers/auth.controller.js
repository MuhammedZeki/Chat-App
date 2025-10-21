const cloudinary = require("../lib/cloudinary");
const { generateToken } = require("../lib/jwt");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email is Existing!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res); //generate jwt token here
      return res.status(201).json(newUser);
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "[POST_SIGNUP]", error: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required!" });
    }
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res.status(400).json({ message: "Email not found!" });
    }
    const passwordCorrect = await bcrypt.compare(password, isUser.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    generateToken(isUser._id, res);
    return res.status(200).json(isUser);
  } catch (error) {
    return res.status(500).json({ message: "[AUHT_LOGİN]" });
  }
};
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "[LOGOUT]" });
  }
};

exports.updatedProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Upload Error:", error);
    return res
      .status(500)
      .json({ message: "[UPDATED_PICTURE]", error: error.message });
  }
};

exports.checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "[CHECK_AUTH]" });
  }
};
