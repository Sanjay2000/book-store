const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const middleware = require("../middleware/auth");
const bookValidators = require("../middleware/validator");

router.post(
  "/add",
  middleware.authAdmin,
  bookValidators("bookSchema"),
  bookController.add
);
router.put(
  "/update/:bookId",
  middleware.authAdmin,
  bookValidators("bookSchema"),
  bookController.update
);
router.get("/list", middleware.authUser, bookController.list);
router.delete("/remove/:bookId", middleware.authAdmin, bookController.remove);
router.get("/view/:bookId", middleware.authUser, bookController.view);

module.exports = router;