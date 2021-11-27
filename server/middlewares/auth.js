const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  //get token from request header
  const authHeader = req.header("Authorization");

  if (authHeader) {
    //split bearer word
    const token = authHeader.split(" ")[1];
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
        //attack user info to request body
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

exports.verifyTokenAndAuthentization = async (
  req,
  res,
  next,
) => {
  this.verifyToken(req, res, () => {
    //only user with correct user id or admin can update
    if (
      req.user.id === req.params.id ||
      req.user.isAdmin
    ) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message:
          "You are now allowed to do this action",
      });
    }
  });
};

exports.verifyTokenAndAdmin = async (
  req,
  res,
  next,
) => {
  this.verifyToken(req, res, () => {
    //only admin can do action on user , product , order
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message:
          "You are now allowed to do this action",
      });
    }
  });
};
