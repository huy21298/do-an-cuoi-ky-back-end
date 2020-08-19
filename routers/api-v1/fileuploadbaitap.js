var express = require("express");
var router = express.Router();
const { loadbaitapdanop } = require("../../controllers/baitap.controller");
router.get("/:sinh_vien_id/:bai_tap_id", loadbaitapdanop); //id của sinh viên
module.exports = router;