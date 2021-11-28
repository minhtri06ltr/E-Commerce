const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/auth");
const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/cart");

//anyone can create cart - required login
router.post("/add", verifyToken, addCart);
//anyone can update cart
router.put(
  "/:id",
  verifyTokenAndAuthentization,
  updateCart,
);
//anyone can delete cart
router.delete(
  "/:id",
  verifyTokenAndAuthentization,
  deleteCart,
);
//anyone can get user cart
router.get(
  "/find/:userId",
  verifyTokenAndAuthentization,
  getCart,
);
//only admin can get all carts
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
