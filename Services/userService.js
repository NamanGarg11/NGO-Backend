const usermodel = require('../Models/usermodel');

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  return await usermodel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  });
};

const findOne = async (filter) => {
  return await usermodel.findOne(filter);
};

module.exports = {
  createUser,
  findOne
};
