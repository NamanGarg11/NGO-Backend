const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first name should have minimum 3 charcters"]
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,"last name should have minimum 3 charcters"]
        }
    },
        email:{
            type:String,
            required:true,
            unique:true,
            minlength:[5,"email  should have minimum 5 charcters"]
        },
        password:{
                type:String,
                required:true,
                select:false,
        },
        socketid:{
            type:String
        }
    
})
userSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token
}
userSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password,this.password);
    
}
userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
} 
const usermodel = mongoose.model('User', userSchema);
module.exports= usermodel;