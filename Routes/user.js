const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const { userSchema } = require('../Validation/userSchema');
const Validate = require("../middlewares/Validate")

router.post('/register',Validate(userSchema), userController.register);

module.exports = router;
