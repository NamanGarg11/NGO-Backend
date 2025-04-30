const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const { userSchema } = require('../Validation/userSchema');
const userValidate = require("../middlewares/userValidate")

router.post('/register', userValidate(userSchema), userController.register);

module.exports = router;
