const router = require("express").Router();
const {
  verifyToken,
} = require("../middlewares/auth");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
  changeQuantity,
  deleteCart,
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
router.post(
  "/removeitem",
  verifyToken,
  removeCartItems,
);
router.post(
  "/changequantity",
  verifyToken,
  changeQuantity,
);
router.delete(
  "/delete",
  verifyToken,
  deleteCart,
);

module.exports = router;
