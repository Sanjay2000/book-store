module.exports = function (app) {
  // importing routes files for routes

  const user = require("./user");
  app.use("/api/v1/user", user);

  const book = require("./book");
  app.use("/api/v1/book", book);

  const purchaseHistory = require("./purchaseHistory");
  app.use("/api/v1/book", purchaseHistory);
};