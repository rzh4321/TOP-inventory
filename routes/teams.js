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

router.get('/create', asyncHandler(async (req, res, next) => {
  const teamList = await Team.find();
  res.render("teamCreate", {title: "Create Team", teamList});
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const [team, players, owners] = await Promise.all([
    Team.findById(req.params.id),
    Player.find().populate("position"),
    Owner.find(),
  ])
  res.render("teamDetails", {title: team.teamName, team, players, owners})
}));

router.post('/create', [
  body("location", "Location cannot be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("name", "Name cannot be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("championships")
    .custom(value => {
      if (!value) return true;
      const yearsList = value.split(' ').map(Number);
      const currentYear = new Date().getFullYear();
      for (const year of yearsList) {
        if (year < 1900 || year > currentYear) return false;
      }
      return true;
    }).withMessage("Invalid year format or range"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const team = new Team({location: req.body.location, name: req.body.name, 
      championships: req.body.championships === ''? [] : req.body.championships.split(' ').map(Number)});
    if (!errors.isEmpty()) {
      res.render("teamCreate", {title: "Create team", team, errors: errors.array()});
    }
    else {
      await team.save();
      res.redirect(team.url);
    }
  })
]);
module.exports = router;
