const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const validate = require("../../validator/sinhvien.validator");
const SinhVien = require("../../model/sinhvien.model");
const status = require("../../constant/status.constant");

router.post("/", validate.validateLogin(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(INVALID_FIELD).json({ success: false, errors: errors.array() });
  }
  const { mat_khau } = req.body;
  SinhVien.findOne({ email: req.body.email }).then((sinhVien) => {
    if (!sinhVien) {
      const errors = [
        {
          msg: "Email không tồn tại",
          param: "email",
        },
      ];
      return res.status(status.INVALID_FIELD).json({
        success: false,
        errors,
      });
    }
    bcrypt.compare(mat_khau, sinhVien.mat_khau).then((ketQua) => {
      if (!ketQua) {
        const errors = [
          {
            msg: "Mật khẩu không chính xác",
            param: "mat_khau",
          },
        ];
        return res.status(status.INVALID_FIELD).json({
          success: false,
          errors,
        });
      }
      const payload = {
        email: sinhVien.email,
        mat_khau: sinhVien.mat_khau,
      };
      // const expiresIn =
      jwt.sign(
        payload,
        `${process.env.JWT_PRIVATE_KEY}`,
        { expiresIn: 3600 * 24 * 7 },
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res
              .status(status.SUCCESS)
              .json({
                token: token,
                expires: 3600 * 24 * 7,
                type: "Bearer",
                success: true,
                message: "Đăng nhập thành công",
              });
          }
        }
      );
    });
  });
});

module.exports = router;
