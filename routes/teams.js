var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Team = require("../models/team");
const Owner = require("../models/owner");
const Player = require("../models/player");

const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const teamList = await Team.find();
  res.render("teamList", {title: "Teams List", teamList});
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const [team, players, owners] = await Promise.all([
    Team.findById(req.params.id),
    Player.find().populate("position"),
    Owner.find(),
  ])
  res.render("teamDetails", {title: team.teamName, team, players, owners})
}));

module.exports = router;
