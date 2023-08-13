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

router.get('/create', asyncHandler(async (req, res, next) => {
  res.render("positionCreate", {title: "Create position"});
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const [position, players] = await Promise.all([
    Position.findById(req.params.id),
    Player.find().populate("team"),
  ])
  res.render("positionDetails", {title: position.position, players, position})
}));

router.post('/create', [
  body("position", "Position must be at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const position = new Position({position: req.body.position});
    if (!errors.isEmpty()) {
      res.render("positionCreate", {title: "Create position", position, errors: errors.array()});
    }
    else {
      await position.save();
      res.redirect(position.url);
    }
  })
]);


module.exports = router;
