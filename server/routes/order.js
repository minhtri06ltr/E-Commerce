const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/auth");
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getOrderStats,
  getUserOrder,
} = require("../controllers/order");

//anyone can create order - required login
router.post("/add", verifyToken, addOrder);
//only admin can update order
router.put(
  "/:id",
  verifyTokenAndAdmin,
  updateOrder,
);
//only admin can delete order
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  deleteOrder,
);
//anyone can get all user's orders
router.get(
  "/find/:userId",
  verifyTokenAndAuthentization,
  getOrder,
);
//only admin can get all orders
router.get(
  "/",
  verifyTokenAndAdmin,
  getAllOrders,
);
//only admin can get monthly income (order stats)
router.get(
  "/income",
  verifyTokenAndAdmin,
  getOrderStats,
);
router.get(
  "/getorder/:id",
  verifyToken,
  getUserOrder,
);
module.exports = router;
