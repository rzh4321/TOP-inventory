var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Position = require("../models/position");
const Player = require("../models/player");
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const positionList = await Position.find();
  res.render("positionList", {title: "Positions List", positionList});
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const [position, players] = await Promise.all([
    Position.findById(req.params.id),
    Player.find().populate("team"),
  ])
  res.render("positionDetails", {title: position.position, players, position})
}));

module.exports = router;
