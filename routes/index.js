var express = require('express');
var router = express.Router();
const Owner = require("../models/owner");
const Player = require("../models/player");
const Position = require("../models/position");
const Team = require("../models/team");
const asyncHandler = require("express-async-handler");


/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  const [
    playerCount,
    teamCount,
    ownerCount,
    positionCount
  ] = await Promise.all([
    Player.countDocuments(),
    Team.countDocuments(),
    Owner.countDocuments(),
    Position.countDocuments(),
  ]);
  res.render("index", {title: "NBA Database Home", playerCount, teamCount, ownerCount, positionCount})
}));

module.exports = router;
