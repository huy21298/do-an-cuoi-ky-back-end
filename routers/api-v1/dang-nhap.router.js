const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const validate =require("../../validator/sinhvien.validator"); 
const SinhVien = require("../../model/sinhvien.model");

router.post("/", validate.validateLogin(),(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ 'success': false, 'errors': errors.array() })
    }
    const { mat_khau } = req.body;
    SinhVien.findOne({ email: req.body.email }).then(sinhVien => {
        if (!sinhVien)
            return res.status(401).json({
                status: false,
                msg: "Sai tên đăng nhập",
                status: false
            });
        bcrypt.compare(mat_khau, sinhVien.mat_khau).then(ketQua => {
            if (!ketQua) {
                return res.status(401).json({
                    success: false,
                    msg: "Sai Mật Khẩu",
                    success: false
                });
            }
            const payload = {
                email: sinhVien.email,
                mat_khau: sinhVien.mat_khau,
            };
            // const expiresIn = 
            jwt.sign(payload, "mysecret", { expiresIn: 3600 * 24 * 7 }, (err, token) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(201).json({ token: token, expires: 3600 * 24 * 7, type: "Bearer" });
                }
            });
        })
    })
});

module.exports = router;