var express = require("express");
var router = express.Router();
const validate = require("../../validator/sinhvien.validator");

const {
    loadLopHocThamGia,
    loadDsSinhVienTrongLop,
    loadBaiThiTrongMotLop,
    thamGiaLopHoc,
    loadBaiTapTrongMotLop,
    hanLamBai,
    layThongTinLopHoc,
    loadBaiThiDaHoanThanh,
    loadBaiThiKhongHoanThanh,
    loadBaiTapDaNop,
    loadBaiTapQuaHan
} = require("../../controllers/lophoc.controller");

router.get("/", loadLopHocThamGia); //id sinh vien
router.get("/:id/danh-sach-sinh-vien", loadDsSinhVienTrongLop); //id lớp
router.get("/:id/bai-thi", loadBaiThiTrongMotLop); //id lớp
router.get("/:id/bai-tap", loadBaiTapTrongMotLop); //id lớp
router.get("/:id/han-nop", hanLamBai);
router.get("/:id/thong-tin-lop-hoc", layThongTinLopHoc);
router.post("/tham-gia",validate.validateLopHoc(),thamGiaLopHoc)
router.get("/:id/han-nop",hanLamBai)
router.get("/:lop_hoc_id/bai-thi-hoan-thanh",loadBaiThiDaHoanThanh)
router.get("/:lop_hoc_id/bai-thi-khong-hoan-thanh", loadBaiThiKhongHoanThanh);
router.get("/:lop_hoc_id/bai-tap-da-nop", loadBaiTapDaNop);
router.get("/:lop_hoc_id/bai-tap-qua-han", loadBaiTapQuaHan);
module.exports = router;