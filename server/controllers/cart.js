const Cart = require("../models/cart");

exports.addCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json({
      success: true,
      message: "Create cart cart successfull",
      savedCart,
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

exports.updateCart = async (req, res) => {
  try {
    const updatedCart =
      await Cart.findByIdAndUpdate(
        req.params.id,
        {
          //set new info to cart in database
          $set: req.body,
        },
        { new: true },
      );
    res.status(200).json({
      success: true,
      message: "Update cart successfull",
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

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Cart has been delete",
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

exports.getCart = async (req, res) => {
  try {
    //every user has one cart
    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      message: "Get user cart successfull",
      cart,
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

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({
      success: true,
      message: "Get all carts successfull",
      carts,
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
