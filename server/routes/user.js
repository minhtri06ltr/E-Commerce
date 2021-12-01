const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth");
const {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/user");

//anyone can update user - required user id
router.put(
  "/:id",
  verifyTokenAndAdmin,
  updateUser,
);
//anyone can update user - required user id
router.delete(
  "/:id",
  verifyTokenAndAuthentization,
  deleteUser,
);
//only admin can get user - required user id
router.get(
  "/find/:id",
  verifyTokenAndAdmin,
  getUser,
);
//only admin can get all users
router.get("/", verifyTokenAndAdmin, getAllUsers);
//only admin can get all stats
router.get(
  "/stats",
  verifyTokenAndAdmin,
  getUserStats,
);
module.exports = router;
