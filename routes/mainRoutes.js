module.exports = function (app) {
  // importing routes files for routes

  const user = require("./user");
  app.use("/api/v1/user", user);

  const gameData = require("./game_data");
  app.use("/api/v1/game/data", gameData);
};
