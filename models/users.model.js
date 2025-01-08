const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Invalid email"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    token : {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.USER, userRoles.MODERATOR],
        default: userRoles.USER,
    },
    avatar: {
        type: String,
        default: "uploads/profile.jpg",
    }
});

module.exports = mongoose.model("User", userSchema);