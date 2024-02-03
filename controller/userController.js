const {
  passwordHash,
  passwordVerify,
  createJwtToken,
} = require("../helper/services");
require("dotenv").config();

const userModel = require('../models/user')

module.exports = {
  register: async (req, res) => {
    try {
      let data = req.body;

      let userEmailCheck = await userModel.find({ email: data.email });
      if (userEmailCheck.length > 0) {
        return res.json(
          helper.showValidationErrorResponse("Email already exist!")
        );
      }
      let userNameCheck = await userModel.find({ username: data.username });
      if (userNameCheck.length > 0) {
        return res.json(
          helper.showValidationErrorResponse("Username already exist!")
        );
      }
      // haspassword
      data.password = await passwordHash(data.password);
      userModel.create(data)
        .then(async (resdata) => {
          return res.json(helper.createResponse("User registerd", resdata));
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
  login: async (req, res) => {
    try {
      let data = req.body;

      //user check
      let userCheck = await userModel.find({ email: data.email });
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

      userModel.findOne({ email: data.email })
        .then(async (resdata) => {
          resdata = resdata;
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
