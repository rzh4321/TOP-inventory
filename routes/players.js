var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Player = require("../models/player");
const asyncHandler = require("express-async-handler");


/* GET players listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const playerList = await Player.find().populate("team position");
  res.render("playerList", {title: "Players List", playerList});
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const player = await Player.findById(req.params.id).populate("team position");
  res.render("playerDetails", {title: player.fullName, player})
}));

module.exports = router;
