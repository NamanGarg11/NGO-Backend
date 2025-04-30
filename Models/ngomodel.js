const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false // for security, don't return by default
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street:{
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type:String,
      required: true
    },
    country: {
      type:String,
      required: true
    },
    pincode: {
      type:String,
      required: true
    }
  },
  mission: {
    type: String,
    maxlength: 1000
  },
  website: String,
  logoUrl: String, // if you allow file uploads
  documents: [String], // URLs or references to docs like 80G, 12A
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
ngoSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
    return token
}
ngoSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password,this.password);
    
}
ngoSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const ngomodel = mongoose.model('Ngo', ngoSchema);
module.exports = ngomodel;
