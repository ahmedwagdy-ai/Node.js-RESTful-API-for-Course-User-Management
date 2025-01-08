const courseModel = require("../models/courses.model");
const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {

  const courses = await courseModel.find({},{"__v": false});   
  res.json({ status: httpStatusText.SUCCESS, data: courses });
};

const getSingleCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await courseModel.findById(courseId);
    return res.json({ status: httpStatusText.SUCCESS, data: course });
  } catch (err) {
    return res
      .status(400)
      .json({
        status: httpStatusText.ERROR,
        data: { course: "Course not found" },
      });
  }
};

const addNewCourse = async (req, res) => {
  try{
    console.log(req.body);

  if (!req.body.name || !req.body.price) {
    return res
      .status(404)
      .json({
        status: httpStatusText.FAIL,
        data: { message: "Please provide name and price" },
      });
  }

  const newCourse = new courseModel(req.body);
  await newCourse.save();

  return res.status(201).json({ status: httpStatusText.SUCCESS, data: newCourse });
  }
  catch (error) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      error: error.message,
    });
  }
};

const editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await courseModel.findByIdAndUpdate(courseId, {
      $set: { ...req.body },
    });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: {message: "Course updated successfully!"} });
  } catch {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data: { course: "Course not found" },
    });
  }
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  await courseModel.findByIdAndDelete(courseId);

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addNewCourse,
  editCourse,
  deleteCourse,
};
