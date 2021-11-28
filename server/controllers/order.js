const Order = require("../models/order");

exports.addOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      message: "Create order successfull",
      savedOrder,
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

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          //set new info to order in database
          $set: req.body,
        },
        { new: true },
      );
    res.status(200).json({
      success: true,
      message: "Update order successfull",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something when wrong ",
      error,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order has been delete",
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

exports.getOrder = async (req, res) => {
  try {
    //get all user's orders
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      message: "Get all user orders successfull",
      orders,
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

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      message: "Get all orders successfull",
      orders,
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

exports.getOrderStats = async (req, res) => {
  const date = new Date();
  //example: if tody is month = 10 => last month = 9 => previous month = 8
  const lastMonth = new Date(
    date.setMonth(date.getMonth() - 1),
  );
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - 1),
  );

  try {
    const income = await Order.aggregate([
      {
        //loop and match order has createAt
        //less than today and greater than previous month
        $match: {
          //last 2 month from today
          createdAt: { $gte: previousMonth },
        },
      },

      {
        $project: {
          month: { $month: "$createdAt" },
          //get amount
          sales: "$amount",
        },
      },
      {
        //group data
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "get order stats successfull",
      income,
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
