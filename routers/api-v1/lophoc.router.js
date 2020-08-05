var express = require("express");
var router = express.Router();
const validate = require("../../validator/sinhvien.validator");

<<<<<<< HEAD
const {
    loadLopHocThamGia,
    loadDsSinhVienTrongLop,
    loadBaiThiTrongMotLop,
    thamGiaLopHoc,
    loadBaiTapTrongMotLop,
    hanLamBai,
    layThongTinLopHoc
} = require("../../controllers/lophoc.controller");

=======
const { loadLopHocThamGia , loadDsSinhVienTrongLop,loadBaiThiTrongMotLop ,thamGiaLopHoc, loadBaiTapTrongMotLop } = require("../../controllers/lophoc.controller");
>>>>>>> 07ef826d2f008bae9e144a7569627a242cabc95b
router.get("/", loadLopHocThamGia); //id sinh vien
router.get("/:id/danh-sach-sinh-vien", loadDsSinhVienTrongLop); //id lớp
router.get("/:id/bai-thi", loadBaiThiTrongMotLop); //id lớp
router.get("/:id/bai-tap", loadBaiTapTrongMotLop); //id lớp
<<<<<<< HEAD
router.post("/tham-gia", validate.validateLopHoc(), thamGiaLopHoc);
router.get("/:id/han-nop", hanLamBai);
router.get("/:id/thong-tin-lop-hoc", layThongTinLopHoc);
=======
router.post("/tham-gia",validate.validateLopHoc(),thamGiaLopHoc)
router.get("/:id/han-nop",hanLamBai )
>>>>>>> 07ef826d2f008bae9e144a7569627a242cabc95b
module.exports = router;