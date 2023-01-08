const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/get-user/:id", userController.getSingleUser);
router.get("/get-users", userController.getAllUsers);
router.put("/update-user", userController.updateUser);
router.post("/update-user-role", userController.updateUserRole);
router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
