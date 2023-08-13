var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Position = require("../models/position");
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const positionList = await Position.find();
  res.render("positionList", {title: "Positions List", positionList});
}));

module.exports = router;
