const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
// SIGN IN
router.post("/signin", authController.handleSignin);
router.post("/login", authController.handleLogin);
router.post("/logout", authController.handleLogin);

module.exports = router;
