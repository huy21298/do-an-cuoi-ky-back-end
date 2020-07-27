const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');

const SinhVien = require("../../model/sinhvien.model");

router.post("/", (req, res) => {
    const { email, mat_khau } = req.body;
    SinhVien.findOne({ email }).then(sinhVien => {
        if (!sinhVien)
            return res.status(401).json({
                status: false,
                msg: "Sai tên đăng nhập",
                status: false
            });
        bcrypt.compare(mat_khau, sinhVien.mat_khau).then(ketQua => {
            if (!ketQua) {
                return res.status(401).json({
                    status: false,
                    msg: "Sai tên đăng nhập",
                    status: false
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