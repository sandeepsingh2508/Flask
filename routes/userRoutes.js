const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/queryControllers");

const router = express.Router();

router.use(express.json());
router.route("/getAllUser").get(getUsers);
router.route("/getSingleUser/:id").get(getUserById);
router.route("/createUser").post(createUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

module.exports = router;
