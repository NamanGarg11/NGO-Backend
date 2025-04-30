const ngomodel = require('../Models/ngomodel');
const ngoServices = require('../Services/ngoServices');

module.exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address: { street, city, state, country, pincode }
    } = req.body;

    // Check if NGO already exists
    const isNgoExists = await ngoServices.findOne({ email });
    if (isNgoExists) {
      return res.status(400).json({ msg: "NGO already exists" });
    }

    // Create an NGO instance to use instance methods
    const ngoInstance = new ngomodel();
    const hashedPassword = await ngoInstance.hashPassword(password);

    // Create new NGO
    const ngo = await ngoServices.createNGO({
      name,
      email,
      phone,
      password: hashedPassword,
      address: {
        street,
        city,
        state,
        country,
        pincode
      }
    });

    // Generate token
    const token = ngo.generateAuthToken();

    // Respond
    res.status(201).json({ token, ngo });

  } catch (error) {
    next(error); // Proper error forwarding to middleware
  }
};
module.exports.loginNGO = async (req, res, next) => {
    const { email, password } = req.body;
    const ngo = await ngomodel.findOne({ email }).select("+password");

    if (!ngo) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await ngo.comparePassword(password); // ✅ corrected from user to ngo
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = ngo.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ token, ngo });
};
