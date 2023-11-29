const gameData = require("../models/gameDataTable");

module.exports = {
  add: async (req, res) => {
    try {
      let data = req.body;
      let user = req.user;
      data.userId = user.id;

      gameData
        .create(data)
        .then((resdata) => {
          return res.json(helper.createResponse("Game data added", resdata));
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
  update: async (req, res) => {
    try {
      let data = req.body;
      let user = req.user.id;

      gameData
        .findOneAndUpdate(
          { userId: user, gameId: data.gameId },
          { $inc: { score: data.score } }
        )
        .then((resdata) => {
          return res.json(
            helper.showSuccessResponse("Game data updated")
          );
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
  list: async (req, res) => {
    try {
      let user = req.user.id;
      var perPage = req.params.perPage || 10;
      var page = Math.max(0, req.params.page || 0);

      gameData
        .find({ userId: user })
        .limit(perPage)
        .skip(perPage * page)
        .sort({ _id: -1 })

        .then((resdata) => {
          return res.json(
            helper.showSuccessResponse("List game data", resdata)
          );
        })
        .catch((err) => {
          console.log(err , 'err');
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
  remove: async (req, res) => {
    try {
      let data = req.body;
      let user = req.user.id;

      gameData
        .deleteOne({ userId: user, gameId: data.gameId })
        .then((resdata) => {
          return res.json(helper.showSuccessResponse("Game data removed", {}));
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
  view: async (req, res) => {
    try {
      let gameId = req.params.gameId;
      let user = req.user.id;

      gameData
        .findOne({ userId: user, gameId: gameId })
        .then((resdata) => {
          return res.json(
            helper.showSuccessResponse("Game data details", resdata)
          );
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
