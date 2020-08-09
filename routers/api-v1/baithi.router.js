var express = require("express");
var router = express.Router();
const { loadBaiThi, nopBaiThi, loadBaiThiHoanThanh } = require("../../controllers/baithi.controller");
router.get("/chi-tiet-bai-thi/:id", loadBaiThi);
router.get("/bai-thi-hoan-thanh", loadBaiThiHoanThanh);
router.post("/nop-bai", nopBaiThi);
module.exports = router;
