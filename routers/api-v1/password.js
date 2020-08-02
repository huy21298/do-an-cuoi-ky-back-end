var express = require("express");
var router = express.Router();
const validate = require("../../validator/sinhvien.validator");
const {quenMatKhau, doiMatKhau, lamMoiToken} = require("../../controllers/sinhvien.controller");
router.post("/quen-mat-khau", quenMatKhau);//id của sinh viên
router.post("/doi-mat-khau/:code/:email",validate.changePassWord(), doiMatKhau); //id ở đây là code đó :*
router.post("/lam-moi-token", lamMoiToken);//id của sinh viên
module.exports = router;
