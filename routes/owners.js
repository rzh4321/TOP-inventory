var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const Owner = require("../models/owner");
const asyncHandler = require("express-async-handler");


/* GET users listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const ownerList = await Owner.find();
  res.render("ownerList", {title: "Owners List", ownerList});
}));

module.exports = router;
