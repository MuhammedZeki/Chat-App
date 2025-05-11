const mongoose = require("mongoose");
const { config } = require("dotenv");
config();
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Success to connecting DataBase");
  } catch (error) {
    console.log("Something Went Wrong!");
  }
};
