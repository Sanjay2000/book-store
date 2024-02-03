const express = require("express");
const router = express.Router();
const purchaseController = require("../controller/purchaseController");
const middleware = require("../middleware/auth");

router.post(
    "/buy",
    middleware.authUser,
    purchaseController.purchaseHistory
);

router.get(
    "/buy/history",
    middleware.authUser,
    purchaseController.listPurchageHistory
);

router.get(
    "/buy/history/:purchaseId",
    middleware.authUser,
    purchaseController.viewPurchaseDetails
);




module.exports = router;