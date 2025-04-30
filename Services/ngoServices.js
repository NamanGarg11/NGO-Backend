const ngomodel = require('../Models/ngomodel');

// Create a new NGO
const createNGO = async ({
  name,
  email,
  password,
  phone,
  address:{
    street,
    city,
    state,
    country,
    pincode
  },
}) => {
  if (!name || !email || !password || !phone) {
    throw new Error("Required fields are missing");
  }

  return await ngomodel.create({
    name,
    email,
    password,
    phone,
    address:{
        street,
        city,
        state,
        country,
        pincode 
    },
  });
};

// Find a single NGO based on a filter (like email, ID, etc.)
const findOne = async (filter) => {
  return await ngomodel.findOne(filter);
};

//  Get all NGOs (useful for admin dashboards or donation listing)
const findAll = async () => {
  return await ngomodel.find();
};

// Update an NGO by ID
const updateNGO = async (id, updateData) => {
  return await ngomodel.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  createNGO,
  findOne,
  findAll,
  updateNGO
};
