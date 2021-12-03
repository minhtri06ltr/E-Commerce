const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(
      condition,
      updateData,

      {
        upsert: true,
      },
    )
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

exports.getCartItems = async (req, res) => {
  try {
    //find user cart
    const findCart = await Cart.findOne({
      user: req.user.id,
      //replace cartItems.product = _id title price img
    }).populate(
      "cartItems.product",
      "_id title price img inStock",
    );

    if (findCart) {
      let cartItems = {};

      findCart.cartItems.forEach(
        (item, index) => {
          //change mongodb _id to string
          //create new cartItems return to client
          cartItems[index] =
            //[key]
            {
              _id: item.product._id.toString(),
              title: item.product.title,
              price: item.product.price,
              quantity: item.quantity,
              color: item.color,
              size: item.size,
              img: item.product.img,
              inStock:
                item.product.inStock.toString(),
            };
        },
      );

      res.status(200).json({
        success: true,
        cartItems,
      });
    } else {
      res.status(400).json({
        success: false,
        message:
          "Something may wrong when working with database",
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

exports.removeCartItems = async (req, res) => {
  try {
    const { productId, color, size } = req.body;

    if (productId) {
      const newCart = await Cart.updateOne(
        { user: req.user.id },
        {
          $pull: {
            cartItems: {
              product: productId,
              color: color,
              size: size,
            },
          },
        },
      );
      if (newCart) {
        return res.status(200).json({
          success: true,
          newCart,
        });
      } else {
        res.status(400).json({
          success: false,
          message:
            "Something may wrong when working with database",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Don't find product in cart",
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
