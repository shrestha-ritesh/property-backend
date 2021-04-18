const express = require('express');

const router = express.Router();
const { register, getUser, login, getUserProfileDetail } = require('../controller/userController');

router.post("/register", register);

router.get("/get", getUser);

//Login route:
router.post("/login", login);

//for user profile details:
router.get("/profile/:userId", getUserProfileDetail);

module.exports = router;