const User = require("../models/user");
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.HASH_KEY,
    ).toString();
  }
  try {
    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          //set new info to user in database
          $set: req.body,
        },
        { new: true },
      );
    res.status(200).json({
      success: true,
      message: "Update user successfull",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:
        "Something when wrong or user name has already taken",
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User has been delete",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id,
    );
    const { password, ...others } = user._doc;
    res.status(200).json({
      success: true,
      message: "Get user successfull",
      ...others,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    //if exits query get 5 newest user if query = true
    const users = query
      ? await User.find()
          .sort({ _id: -1 })
          .limit(5)
      : await User.find(req.params.id);

    res.status(200).json({
      success: true,
      message: "Get all user successfull",
      users, //return array
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};

exports.getUserStats = async (req, res) => {
  const date = new Date();
  //setFullYear -> set year we want to object
  // last year = current year - 1
  const lastYear = new Date(
    date.setFullYear(date.getFullYear() - 1),
  );
  try {
    const data = await User.aggregate([
      //condition
      {
        //loop and match user has createAt
        //less than today and greater than last year
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          //take month createAt in database
          month: { $month: "$createdAt" },
        },
      },
      {
        //group all user the same month
        $group: {
          _id: "$month",
          //sum all registered user
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong",
      error,
    });
  }
};
