var express = require("express");
var router = express.Router();
const { loadLopHocThamGia , loadDsSinhVienTrongLop,loadBaiThiTrongMotLop } = require("../../controllers/lophoc.controller");

router.get("/:id", loadLopHocThamGia);
router.get("/:id/danh-sach-sinh-vien",loadDsSinhVienTrongLop );
router.get("/:id/bai-thi", loadBaiThiTrongMotLop);
module.exports = router;