var express = require("express");
var router = express.Router();
const { loadLopHocThamGia , loadDsSinhVienTrongLop,loadBaiThiTrongMotLop } = require("../../controllers/lophoc.controller");

router.get("/:id", loadLopHocThamGia); //id sinh vien
router.get("/:id/danh-sach-sinh-vien",loadDsSinhVienTrongLop ); //id lớp
router.get("/:id/bai-thi", loadBaiThiTrongMotLop); //id lớp
module.exports = router;