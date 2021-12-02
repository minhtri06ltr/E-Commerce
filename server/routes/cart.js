const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/auth");
const {
  addItemToCart,
} = require("../controllers/cart");

router.post(
  "/addtocart",
  verifyTokenAndAuthentization,
  addItemToCart,
);

module.exports = router;
