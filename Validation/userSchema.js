const express = require('express');
const {z} = require('zod');
module.exports.userSchema = z.object({
    email: z.string().email(),
    fullname: z.object({
      firstname: z.string().min(3),
      lastname: z.string().min(3)
    }),
    password: z.string().min(6)
  });