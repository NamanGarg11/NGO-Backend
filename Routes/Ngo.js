const express = require('express');
const router = express.Router();
const Validate = require("../middlewares/Validate");
const { ngoSchema } = require('../Validation/ngoSchema');
const ngoController = require('../controller/ngoController');
router.post('/register', Validate(ngoSchema),ngoController.register);
module.exports = router;