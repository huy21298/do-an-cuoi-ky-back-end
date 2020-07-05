var express = require("express");
var router = express.Router();
const { loadBaiThi } = require("../../controllers/baithi.controller");
router.get("/:id", loadBaiThi);
module.exports = router;
