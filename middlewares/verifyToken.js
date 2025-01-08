const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];

    if(!authHeader) {
        return res.status(400).json({ status: httpStatusText.ERROR, message: "Token is required" });    }

    const token = authHeader.split(" ")[1];

    try{
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        
        next();
    }
    catch(err){
        console.error("Error while verifying token: " + err);
        return res.status(403).json({ status: httpStatusText.ERROR, message: "Invalid token" });
    }

};

module.exports = verifyToken;