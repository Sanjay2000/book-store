const mongoose = require("mongoose");
let gameDataSchema = mongoose.Schema(
  {
    userId: { type: Number },
    score: { type: Number, default: 0 },
    gameId: { type: Number },
  },
  { timestamps: true }
);

const GameData = (module.exports = mongoose.model("game_data", gameDataSchema));
