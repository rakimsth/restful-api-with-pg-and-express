const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../middlewares");
const { authController } = require("../controllers");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signup
);

router.post("/signin", authController.signin);

module.exports = router;
