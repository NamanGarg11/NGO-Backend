const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const { userSchema, userLoginSchema } = require('../Validation/userSchema');
const Validate = require("../middlewares/Validate");
const { authUser } = require('../middlewares/authmiddleware');

router.post('/register',Validate(userSchema), userController.register);
router.post('/login',Validate(userLoginSchema), userController.loginUser);
router.get('logout',authUser,userController.logoutUser);
module.exports = router;
