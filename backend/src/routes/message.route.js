const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const {
  getUser,
  sendMessage,
  getMessage,
} = require("../controllers/message.controller");
const router = express.Router();

router.get("/users", protectRoute, getUser);
router.get("/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage);
module.exports = router;
