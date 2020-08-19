var express = require("express");
var router = express.Router();
const { loadbaitapdanop } = require("../../controllers/baitap.controller");
router.get("/:id/:idbaitap/:name", loadbaitapdanop); //id của sinh viên
module.exports = router;