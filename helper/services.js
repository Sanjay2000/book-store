const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  passwordHash: async (password) => {
    return passwordHash.generate(password);
  },
  passwordVerify: async (password, userPass) => {
    return passwordHash.verify(password, userPass);
  },
  createJwtToken: async (resdata) => {
    return jwt.sign(
      {
        id: resdata.id,
        email: resdata.email,
        role: resdata.role,
        username: resdata.name,
      },
      process.env.JWT_KEY
    );
  },
  verifyToken: async (token)=>{
   return jwt.verify(token, process.env.JWT_KEY);

  }
};
