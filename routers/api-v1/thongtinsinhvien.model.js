var express = require("express");
var router = express.Router();
const { LoadThongTinSinhVien } = require("../../controllers/thongtinsinhvien.controller");
router.get("/:id", LoadThongTinSinhVien);
module.exports = router;
