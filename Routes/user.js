const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const { userSchema, userLoginSchema } = require('../Validation/userSchema');
const Validate = require("../middlewares/Validate")

router.post('/register',Validate(userSchema), userController.register);
router.post('/login',Validate(userLoginSchema), userController.loginUser);
module.exports = router;
