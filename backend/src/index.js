const express = require("express");
const { config } = require("dotenv");
const AuthRoutes = require("./routes/auth.route");
const MessageRoutes = require("./routes/message.route");
const { connectDB } = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./lib/socket");
const PORT = process.env.PORT || 3000;

config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/auth", AuthRoutes);
app.use("/messages", MessageRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
