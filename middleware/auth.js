const User = require("../models/gameDataTable.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const knex = require("../db_connections/sql_db.js");
const { verifyToken } = require("../helper/services.js");
module.exports = {
  authUser: async (req, res, next) => {
    if (!req.get("Authorization")) {
      return res.json(
        helper.showErrorResponse("Authorization token is required")
      );
    }
    let token = req.get("Authorization").replace("Bearer ", "");
    console.log(token, "token");
    try {
      const decoded = await verifyToken(token);

      let user = await knex("users")
        .where("email", decoded.email)
        .andWhere("role", "USER");

      if (user.length == 0) {
        return res.json(helper.showUnathorizedErrorResponse("Not authorized"));
      }
      req.user = user[0];

      next();
    } catch (error) {
      const resdata = helper.showUnathorizedErrorResponse("Invalid token");
      resdata.isInvalidToken = true;
      res.json(resdata);
    }
  },
};
