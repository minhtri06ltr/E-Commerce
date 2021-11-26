const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
exports.register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    //hash password
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.HASH_KEY,
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "Register new user successfull",
      savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
//LOGIN

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    //check username
    !user &&
      res.status(401).json({
        success: false,
        message: "Wrong user name or password",
      });
    const hasedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.HASH_KEY,
    );

    const DatabasePassword =
      hasedPassword.toString(CryptoJS.enc.Utf8);
    //check password
    DatabasePassword !== req.body.password &&
      res.status(401).json({
        success: false,
        message: "Wrong user name or password",
      });

    //success
    const accessToken = jwt.sign(
      {
        //store in token
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" },
    );
    const { password, ...others } = user._doc;
    res.status(200).json({
      success: true,
      message: "Login successfull",
      ...others,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};
