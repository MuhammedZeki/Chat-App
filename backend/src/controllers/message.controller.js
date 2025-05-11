const User = require("../models/User.model");
const Message = require("../models/Message.model");
const cloudinary = require("../lib/cloudinary");
const { io, getReceviredSocketId } = require("../lib/socket");

exports.getUser = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    if (!users) {
      return res.status(400).json({ message: "Something went wrong!" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "[GET_USER_FOR_BAR]" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: yourId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: yourId }, //my(hello) ===>she
        { senderId: yourId, receiverId: myId }, //she(thx) ===>my
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "[GET_MESSAGE]" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
      console.log("İMAGEURL", imageUrl);
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    //Gerçek zamanlı mesaj gönderimi
    const receviredSocketId = getReceviredSocketId(receiverId);
    if (receviredSocketId) {
      io.to(receviredSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("SEND_MESSAGE ERROR:", error);
    return res.status(500).json({ message: "[SEND_MESSAGE]" });
  }
};
