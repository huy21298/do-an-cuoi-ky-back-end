var express = require("express");
var router = express.Router();
const { loadAvatar} = require("../../controllers/sinhvien.controller");
router.get("/:id/:name", loadAvatar); //id của sinh viên
module.exports = router;