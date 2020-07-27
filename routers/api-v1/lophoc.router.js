var express = require("express");
var router = express.Router();
const validate = require("../../validator/sinhvien.validator");
const { loadLopHocThamGia , loadDsSinhVienTrongLop,loadBaiThiTrongMotLop ,thamGiaLopHoc } = require("../../controllers/lophoc.controller");
router.get("/:id", loadLopHocThamGia); //id sinh vien
router.get("/:id/danh-sach-sinh-vien",loadDsSinhVienTrongLop ); //id lớp
router.get("/:id/bai-thi", loadBaiThiTrongMotLop); //id lớp
router.post("/",thamGiaLopHoc)
module.exports = router;