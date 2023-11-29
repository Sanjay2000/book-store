const {
  passwordHash,
  passwordVerify,
  createJwtToken,
} = require("../helper/services");
require("dotenv").config();
const knex = require("../db_connections/sql_db");
const { publishUserRegistrationEvent } = require("../helper/event_notifiy");

module.exports = {
  register: async (req, res) => {
    try {
      let data = req.body;

      let userEmailCheck = await knex("users").where("email", data.email);
      if (userEmailCheck.length > 0) {
        return res.json(
          helper.showValidationErrorResponse("Email already exist!")
        );
      }
      let userNameCheck = await knex("users").where("username", data.username);
      if (userNameCheck.length > 0) {
        return res.json(
          helper.showValidationErrorResponse("Username already exist!")
        );
      }
      // haspassword
      data.password = await passwordHash(data.password);

      knex("users")
        .insert(data)
        .then(async (resdata) => {
          let userdata = await knex("users").where("id", resdata[0]);
          const user = {
            username: userdata[0].username,
            email: userdata[0].email,
          };
          publishUserRegistrationEvent(user);
          return res.json(helper.createResponse("User registerd", userdata));
        })
        .catch((err) => {
          console.log(err, "err");
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
  login: async (req, res) => {
    try {
      let data = req.body;

      //user check
      let userCheck = await knex("users").where("email", data.email);
      if (userCheck.length == 0) {
        return res.json(helper.showValidationErrorResponse("User not exist"));
      }

      //verfiy password
      let verifyPass = await passwordVerify(
        data.password,
        userCheck[0].password
      );
      if (!verifyPass) {
        return res.json(helper.showValidationErrorResponse("Invalid password"));
      }

      knex("users")
        .where("email", data.email)
        .then(async (resdata) => {
          resdata = resdata[0];
          resdata.auth_token = await createJwtToken(resdata);
          return res.json(helper.showSuccessResponse("User login", resdata));
        })
        .catch((err) => {
          return res.json(
            helper.showDatabaseErrorResponse("Internal db error")
          );
        });
    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
};
