var express = require("express");
var router = express.Router();
const { loadBaiThi, nopBaiThi } = require("../../controllers/baithi.controller");
router.get("/:id", loadBaiThi);
router.post("/nop-bai", nopBaiThi);
module.exports = router;
