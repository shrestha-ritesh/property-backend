const express = require('express');

const router = express.Router();
const { register, getUser, login, getUserProfileDetail, updateUserDetails, deleteUser, changePassword } = require('../controller/userController');

router.post("/register", register);

router.get("/get", getUser);

//Login route:
router.post("/login", login);

//for user profile details:
router.get("/profile/:userId", getUserProfileDetail);

router.patch("/updateUser/:userId", updateUserDetails);

router.delete("/deleteuser/:userId", deleteUser);

//For changing the password:
router.post("/changepassword/:userId", changePassword);

module.exports = router;