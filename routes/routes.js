const express = require('express');

const router = express.Router();
const { register, getUser, login } = require('../controller/userController');

router.post("/register", register);

router.get("/get", getUser);

//Login route:
router.post("/login", login);

module.exports = router;