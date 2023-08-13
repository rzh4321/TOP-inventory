var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Team = require("../models/team");
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const teamList = await Team.find();
  res.render("teamList", {title: "Teams List", teamList});
}));

module.exports = router;
