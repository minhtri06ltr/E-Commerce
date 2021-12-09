const Order = require("../models/order");
const mongoose = require("mongoose");
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
      _id: req.params.orderId,
    }).populate("userId", "username");

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
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find()
          .sort({ _id: -1 })
          .limit(5)
      : await Order.find();
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
  const productId = req.query.pid;

  const date = new Date();
  const lastMonth = new Date(
    date.setMonth(date.getMonth() - 1),
  );
  const previousMonth = new Date(
    new Date().setMonth(lastMonth.getMonth() - 1),
  );

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: {
              $elemMatch: {
                productId:
                  mongoose.Types.ObjectId(
                    productId,
                  ),
              },
            },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
          quantity: { $sum: 1 },
        },
      },
    ]);
    console.log(income);
    res.status(200).json({
      success: true,
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

exports.getUserOrder = async (req, res) => {
  console.log(req.params.id);
  try {
    const findOrder = await Order.find({
      userId: req.params.id,
    });
    res.status(200).json({
      success: true,
      message: "Create order successfull",
      findOrder,
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
