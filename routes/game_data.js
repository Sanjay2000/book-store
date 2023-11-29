const express = require("express");
const router = express.Router();
const gameDataController = require("../controller/gameDataController");
const middleware = require("../middleware/auth");
const userValidators = require("../middleware/validator");

router.post(
  "/add",
  middleware.authUser,
  userValidators("addGameDataSchema"),
  gameDataController.add
);
router.put(
  "/update",
  middleware.authUser,
  userValidators("addGameDataSchema"),
  gameDataController.update
);
router.get("/list", middleware.authUser, gameDataController.list);
router.delete("/remove", middleware.authUser, gameDataController.remove);
router.get("/view/:gameId", middleware.authUser, gameDataController.view);

module.exports = router;
// sudo apt-get update
// sudo apt-get install rabbitmq-server