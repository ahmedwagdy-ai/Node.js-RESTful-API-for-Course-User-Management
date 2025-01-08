require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.use(express.json());

const httpStatusText = require("./utils/httpStatusText");

const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");

app.use("/courses", coursesRouter);
app.use("/users", usersRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({ status: httpStatusText.ERROR, message: "this resourse  is not available" });
  next();
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
