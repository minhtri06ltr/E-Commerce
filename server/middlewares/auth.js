const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  //get token from request header
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(
      token,
      process.env.JWT_KEY,
      (error, user) => {
        if (error) {
          return res.status(403).json({
            success: false,
            message: "Invalid token or expire",
          });
        }
        //attack user info again
        req.user = user;
        //pass verify token
        next();
      },
    );
  } else {
    return res.status(401).json({
      success: false,
      message: "Can't found token",
    });
  }
};
