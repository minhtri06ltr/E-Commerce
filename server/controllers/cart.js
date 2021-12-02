const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updateData, {
      upsert: true,
    })
      .then((result) => resolve())
      .catch((error) => reject(error));
  });
}

exports.addItemToCart = async (req, res) => {
  try {
    // find user's cart in database
    const _cart = await Cart.findOne({
      user: req.user.id,
    });

    if (_cart) {
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        //get product from cart of user
        const product = cartItem.product;
        //get product from cart in database
        const item = _cart.cartItems.find(
          (c) =>
            c.product == product &&
            c.size === cartItem.size &&
            c.color === cartItem.color, //return 1 value
        );
        item
          ? console.log(item)
          : console.log("no co");
        // console.log(item.color);
        // console.log(item.size);
        // console.log(req.body.cartItems[0].size);
        // console.log(req.body.cartItems[0].color);
        let condition, update;
        //product already exit in cart of database -> change quantity
        if (item) {
          condition = {
            user: req.user.id,
            "cartItems._id": item._id,
          };
          update = {
            // $set: {
            //   "cartItems.$": cartItem,
            // },
            $inc: {
              "cartItems.$.quantity":
                req.body.cartItems[0].quantity,
            },
          };
        } else {
          //product don't have in cart add new
          condition = { user: req.user.id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        // using promise array to check all products user add to cart
        promiseArray.push(
          runUpdate(condition, update),
        );
      });

      Promise.all(promiseArray)
        .then((response) =>
          res.status(200).json({
            success: true,
            response,
          }),
        )
        .catch((error) => {
          console.log(error);
          res.status(400).json({
            success: false,
            message: "Promise all problem",
            error,
          });
        });
    } else {
      //user don't have cart -> create new cart

      const cart = new Cart({
        user: req.user.id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message:
              "Something may wrong when working with database",
          });
        }
        if (cart)
          return res.status(200).json({
            success: true,
            cart,
          });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something may wrong",
    });
  }
};
