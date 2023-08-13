var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Player = require("../models/player");
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const playerList = await Player.find().populate("team position");
  res.render("playerList", {title: "Players List", playerList});
}));

module.exports = router;
