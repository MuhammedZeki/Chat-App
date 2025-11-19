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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", AuthRoutes);
app.use("/messages", MessageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
