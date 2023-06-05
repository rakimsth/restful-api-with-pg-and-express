const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const { userController } = require("../controllers");

// API for CRUD
router.get("/", [authJwt.verifyToken], userController.findAll);

router.get("/:id", [authJwt.verifyToken], userController.findById);

router.put("/:id", [authJwt.verifyToken], userController.update);

router.delete("/:id", [authJwt.verifyToken], userController.deleteById);

// API for testing
router.get("/open", userController.allAccess);

router.get("/user", [authJwt.verifyToken], userController.userBoard);

router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);

router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

module.exports = router;
