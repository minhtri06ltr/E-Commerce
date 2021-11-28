const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product");

//only admin can add new product
router.post(
  "/add",
  verifyTokenAndAdmin,
  addProduct,
);
//only admin can update product - required product id
router.put(
  "/:id",
  verifyTokenAndAdmin,
  updateProduct,
);
//only admin can delete product  - required product id
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  deleteProduct,
);
//anyone can get product  - required product id
router.get("/find/:id", getProduct);
//anyone can get all products
router.get("/", getAllProducts);
module.exports = router;
