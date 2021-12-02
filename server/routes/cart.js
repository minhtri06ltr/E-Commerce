const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
} = require("../middlewares/auth");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart");

router.post(
  "/addtocart",
  verifyTokenAndAuthentization,
  addItemToCart,
);
router.get(
  "/getcartitems",
  verifyTokenAndAuthentization,
  getCartItems,
);
router.delete(
  "/removeitem",
  verifyTokenAndAuthentization,
  removeCartItems,
);
module.exports = router;
