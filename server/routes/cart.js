const router = require("express").Router();
const {
  verifyToken,
} = require("../middlewares/auth");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart");

router.post(
  "/addtocart",
  verifyToken,
  addItemToCart,
);
router.get(
  "/getcartitems",
  verifyToken,
  getCartItems,
);
router.delete(
  "/removeitem",
  verifyToken,
  removeCartItems,
);
module.exports = router;
