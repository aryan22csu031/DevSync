const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authVerification = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodedMsg = jwt.verify(token, "JWT_SECRET_KEY");
    const { _id } = decodedMsg;
    const user = await User.findById(_id); 
    if (!user) {
      throw new Error("user not found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "You are not logged in !",
      Error: err || err.message,
    });
  }
};

module.exports = authVerification;
