var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Owner = require("../models/owner");
const Team = require("../models/team");
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const ownerList = await Owner.find();
  res.render("ownerList", {title: "Owners List", ownerList});
}));

router.get('/create', asyncHandler(async (req, res, next) => {
  const teams = await Team.find();
  res.render("ownerList", {title: "Owners List", teams});
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
  const owner = await Owner.findById(req.params.id).populate("team");
  res.render("ownerDetails", {title: owner.fullName, owner})
}));


module.exports = router;
