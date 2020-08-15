var express = require("express");
var router = express.Router();
const { loadBaiThi, nopBaiThi, loadBaiThiHoanThanh, xemDiemBaiThi } = require("../../controllers/baithi.controller");
router.get("/chi-tiet-bai-thi/:id", loadBaiThi);
router.get("/bai-thi-hoan-thanh", loadBaiThiHoanThanh);
router.post("/nop-bai", nopBaiThi);
router.get("/xem-diem", xemDiemBaiThi);
module.exports = router;
