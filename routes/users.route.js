const express = require("express");

const router = express.Router();

const controllers = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(verifyToken, controllers.getAllUsers);

router.route("/register").post(controllers.register);

router.route("/login").post(controllers.login);

module.exports = router;
