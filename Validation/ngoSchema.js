const express = require('express');
const {z} = require('zod');
module.exports.ngoSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone:z.string().min(10),
    address:z.object({
        street: z.string().min(3),
        city: z.string().min(3),
        state: z.string().min(3),
        country: z.string().refine(val => val.toLowerCase() === "india", {
            message: "Country must be India"
          }),
        pincode: z.string().min(6)
    }),
    password: z.string().min(6),
  });