const { Tieu_De } = require("../controllers/lambaithi.controller");
var express = require ("express");
var router = express.Router();
router.get("/",Tieu_De);
module.exports = router;
