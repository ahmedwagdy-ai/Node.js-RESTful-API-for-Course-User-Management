const express = require("express");

const router = express.Router();

const controllers = require("../controllers/courses.controller");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo");

router
    .route("/")
    .get(verifyToken, controllers.getAllCourses)
    .post(verifyToken, controllers.addNewCourse);

router
  .route("/:id")
  .get(controllers.getSingleCourse)
  .patch(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MODERATOR),controllers.editCourse)
  .delete(controllers.deleteCourse);

module.exports = router;
