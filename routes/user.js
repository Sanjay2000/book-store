const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidators = require("../middleware/validator");

router.post(
  "/register",
  userValidators("registerSchema"),
  userController.register
);

router.post(
    "/login",
    userValidators("loginSchema"),
    userController.login
  );

module.exports = router;