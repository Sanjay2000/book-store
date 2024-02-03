const User = require("../models/user.js");
require("dotenv").config();
const { verifyToken } = require("../helper/services.js");
module.exports = {
  authUser: async (req, res, next) => {
    if (!req.get("Authorization")) {
      return res.json(
        helper.showErrorResponse("Authorization token is required")
      );
    }
    let token = req.get("Authorization").replace("Bearer ", "");
    try {
      const decoded = await verifyToken(token);

      let user = await User.findOne({ email: decoded.email })

      if (user.length == 0) {
        return res.json(helper.showUnathorizedErrorResponse("Not authorized"));
      }
      req.user = decoded;

      next();
    } catch (error) {
      const resdata = helper.showUnathorizedErrorResponse("Invalid token");
      resdata.isInvalidToken = true;
      res.json(resdata);
    }
  },
  authAdmin: async (req, res, next) => {
    if (!req.get("Authorization")) {
      return res.json(
        helper.showErrorResponse("Authorization token is required")
      );
    }
    let token = req.get("Authorization").replace("Bearer ", "");

    try {
      const decoded = await verifyToken(token);

      let user = await User.find({ email: decoded.email, role: { $in: ['Author', 'Admin'] } })

      if (user.length == 0) {
        return res.json(helper.showUnathorizedErrorResponse("Not authorized"));
      }
      req.user = decoded;

      next();
    } catch (error) {
      const resdata = helper.showUnathorizedErrorResponse("Invalid token");
      resdata.isInvalidToken = true;
      res.json(resdata);
    }
  },
};
