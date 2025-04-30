const usermodel = require('../Models/usermodel');
const userService = require('../Services/userService');
const userSchema = require('../Validation/userSchema');
const { z } = require('zod');
module.exports.register = async (req, res,next) => {
    const { fullname, email, password } = req.body;
    const isUserExists = await userService.findOne({email});
    if(isUserExists){
        return res.status(400).json({msg:"User already exists"});
    }   

const userInstance = new usermodel();
const hashPassword = await userInstance.hashPassword(password);
const user = await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,password:hashPassword
});
const token = user.generateAuthToken();
res.status(201).json({token,user})
}