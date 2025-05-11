const express = require("express");
const {
  signUp,
  login,
  logout,
  updatedProfile,
  checkAuth,
} = require("../controllers/auth.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updated-profile", protectRoute, updatedProfile);
router.get("/check", protectRoute, checkAuth);

module.exports = router;
