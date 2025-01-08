const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        minlength: 3,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
})

module.exports = mongoose.model("Course", courseSchema); 
