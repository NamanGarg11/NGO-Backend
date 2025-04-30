const express = require('express');
const router = express.Router();
const Validate = require("../middlewares/Validate");
const { ngoSchema ,ngoLoginSchema} = require('../Validation/ngoSchema');
const ngoController = require('../controller/ngoController');
router.post('/register', Validate(ngoSchema),ngoController.register);
router.post('/login', Validate(ngoLoginSchema), ngoController.loginNGO);
module.exports = router;