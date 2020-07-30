var express = require("express");
var router = express.Router();
const validate = require("../../validator/sinhvien.validator");
const {quenMatKhau, doiMatKhau} = require("../../controllers/sinhvien.controller");
router.post("/quen-mat-khau", quenMatKhau);//id của sinh viên
router.post("/doi-mat-khau/:id",validate.changePassWord(), doiMatKhau);
module.exports = router;
