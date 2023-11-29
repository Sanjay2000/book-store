const mongoose = require("mongoose");
require("dotenv").config();

//****Database connection mongodb using mongoose */
function mongoDbConnection() {
  const mongoAtlasUri = process.env.MONGO_URI;

  mongoose.connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", function callback() {
    console.log("mongoDb Connected");
  });
}

module.exports = mongoDbConnection;
