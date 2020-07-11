var express = require("express");
var router = express.Router();
const { suaThongTin } = require("../../controllers/suathongtin.controller");
router.post("/:id", suaThongTin);
module.exports = router;
