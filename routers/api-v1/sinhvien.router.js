var express = require("express");
var router = express.Router();
const fileUpload = require('express-fileupload');
const validate = require("../../validator/sinhvien.validator");
const { suaThongTin ,CapNhatAvatar, LoadThongTinSinhVien ,quenMatKhau, doiMatKhau , updateMatKhau} = require("../../controllers/sinhvien.controller");
router.get("/", LoadThongTinSinhVien); //id của sinh viên
// router.post("/sua-thong-tin",validate.validateSuaThongTin(), suaThongTin);//id của sinh viên
router.post("/sua-thong-tin", suaThongTin);//id của sinh viên
router.post("/cap-nhat-avatar",fileUpload(), CapNhatAvatar);//id của sinh viên
//router.post("/quen-mat-khau", quenMatKhau);//id của sinh viên
router.post("/doi-mat-khau",validate.resetPassWord(), updateMatKhau);
module.exports = router;