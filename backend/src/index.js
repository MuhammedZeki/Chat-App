const express = require("express");
const { config } = require("dotenv");
const AuthRoutes = require("./routes/auth.route");
const MessageRoutes = require("./routes/message.route");
const { connectDB } = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./lib/socket");
const PORT = process.env.PORT || 3000;
const path = require("path");
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/:path*", (req, res) => {
    res.send(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
