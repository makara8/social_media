const express = require("express");
const FrindController = require("../controller/FriendController");

const router = express.Router();

router.post("/friends", FrindController.addUnfriend);
router.get("/get-all-friend/:id", FrindController.getAllFrindAndNotFrind);

module.exports = router;
