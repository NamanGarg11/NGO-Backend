const usermodel = require('../Models/usermodel');
const userService = require('../Services/userService');
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
module.exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usermodel.findOne({ email }).select("+password");
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = user.generateAuthToken();
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
      });
  
      const { password: _, ...safeUser } = user.toObject();
      res.status(200).json({ token, user: safeUser });
  
    } catch (error) {
      next(error); // Pass error to your error handling middleware
    }
};
module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict"
    });
    res.status(200).json({ message: "Logged out successfully" });
}
  