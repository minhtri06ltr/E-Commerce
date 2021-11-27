const router = require("express").Router();
const {
  verifyTokenAndAuthentization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth");
const {
  userUpdateInfo,
  getUser,
  deleteUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/user");

router.put(
  "/:id",
  verifyTokenAndAuthentization,
  userUpdateInfo,
);

router.delete(
  "/:id",
  verifyTokenAndAuthentization,
  deleteUser,
);
//only admin can get user
router.get(
  "/find/:id",
  verifyTokenAndAdmin,
  getUser,
);

router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get(
  "/stats",
  verifyTokenAndAdmin,
  getUserStats,
);
module.exports = router;
