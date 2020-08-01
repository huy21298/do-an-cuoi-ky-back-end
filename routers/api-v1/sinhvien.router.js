var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/avatar" });
const fs = require("fs");
const validate = require("../../validator/sinhvien.validator");
const { suaThongTin ,CapNhatAvatar, LoadThongTinSinhVien ,quenMatKhau, doiMatKhau , updateMatKhau} = require("../../controllers/sinhvien.controller");
router.get("/", LoadThongTinSinhVien); //id của sinh viên
router.post("/sua-thong-tin",validate.validateSuaThongTin(), suaThongTin);//id của sinh viên
router.post("/cap-nhat-avatar",upload.single("avatar"), CapNhatAvatar);//id của sinh viên
//router.post("/quen-mat-khau", quenMatKhau);//id của sinh viên
router.post("/doi-mat-khau",validate.resetPassWord(), updateMatKhau);
module.exports = router;
