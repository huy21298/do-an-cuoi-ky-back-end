/** Import third library */
const mongoose = require("mongoose");
const fs = require("fs");
const nodemailer = require("nodemailer");
var uuid = require("uuid");
const moment = require("moment");
const bcrypt = require("bcrypt");
/** Import model */
const SuaThongTin = require("../model/suathongtin.model");
const SinhVien = require("../model/sinhvien.model");
const QuenMatKhau = require("../model/quenmatkhau.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const { validationResult } = require("express-validator");
const { compareSync } = require("bcrypt");
const status = require("../constant/status.constant");

const LoadThongTinSinhVien = (req, res) => {
  const { _id } = req.user;
  SinhVien.findById({ _id })
    .select(
      "ma_sv ho ten email gioi_tinh gioi_tinh_format ngay_sinh ngay_sinh_format anh_dai_dien sdt"
    )
    .then((thongTinSinhVien) => {
      console.log("thongTinSinhVien", thongTinSinhVien);
      const data = {
        thongTinSinhVien,
      };
      res.status(status.SUCCESS).json({ success: true, data });
    })
    .catch((e) => noticeCrash(res));
};
const suaThongTin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(status.INVALID_FIELD)
      .json({ success: false, errors: errors.array() });
    return;
  }
  const nguoi_dung_id = req.user._id;
  const thong_tin = JSON.parse(req.body.thong_tin);

  const isExist = await SuaThongTin.exists({ nguoi_dung_id });

  if (isExist) {
    return res
      .status(status.SUCCESS)
      .json({
        success: false,
        msg:
          "Bạn đã thay đổi thông tin trước đó nhưng chưa được quản trị viên kiểm duyệt. Vui lòng quay lại sau",
      });
  }

  SuaThongTin.create({
    ...thong_tin,
    nguoi_dung_id: nguoi_dung_id,
    trang_thai: Boolean(false),
    la_sinhvien: Boolean(true),
  })
    .then((suaThongTin) => {
      if (suaThongTin) {
        res
          .json({ success: true, msg: "Thông tin đã được gửi , chờ phê duyệt" })
          .status(status.SUCCESS);
      }
    })
    .catch((e) => noticeCrash(res));
};
const CapNhatAvatar = (req, res) => {
  const _id = req.user._id;
  //console.log(req.user._id)
  SinhVien.findById({ _id })
    .then((user) => {
      if (user) {
        //console.log(user)
        const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
        let orgName = processedFile.originalname || ""; // Tên gốc trong máy tính của người upload
        orgName = orgName.trim().replace(/ /g, "-");
        const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
        // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
        const newFullPath = `${fullPathInServ}-${orgName}`;
        fs.renameSync(fullPathInServ, newFullPath);
        req.body.anh_dai_dien = orgName;
        const _id = req.params.id;
        SinhVien.updateOne(
          { _id },
          { $set: { anh_dai_dien: req.body.anh_dai_dien } }
        )
          .then((aVaTar) => {
            if (aVaTar) {
              res.status(status.SUCCESS).json({
                success: true,
                msg: "Cập nhật avatar thàng công",
                fileNameInServer: orgName,
              });
            }
          })
          .catch((e) => noticeCrash(res));
      }
    })
    .catch((e) => console.log(e));
};

const sendMail = (user, link) => {
  const option = {
    service: "gmail",
    auth: {
      user: `${process.env.MAIL_NAME}`, // email hoặc username
      pass: `${process.env.MAIL_PASSWORD}`, // password
    },
  };
  var transporter = nodemailer.createTransport(option);
  transporter.verify(function (error, success) {
    // Nếu có lỗi.
    if (error) {
      console.log(error);
    } else {
      //Nếu thành công.
      console.log("Kết nối thành công!");
      var mail = {
        from: "0306171130@caothang.edu.vn", // Địa chỉ email của người gửi
        to: user, // Địa chỉ email của người gửi
        subject: "Cập nhật lại mật khẩu", // Tiêu đề mail
        text: link, // Nội dung mail dạng text
      };
      //Tiến hành gửi email
      transporter.sendMail(mail, function (error, info) {
        if (error) {
          // nếu có lỗi
          console.log(error);
        } else {
          //nếu thành công
          console.log("Email sent: " + info.response);
        }
      });
    }
  });
};
const makeid = () => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
const HTMLmail = (code, email) => {
  return ` 
    Bấm vào Link để thay đỗi mật khẩu:
    ${process.env.URL_FRONT_END}/lam-moi-mat-khau/${code}/${email} `;
};

const quenMatKhau = (req, res) => {
  const email = req.body.email;
  SinhVien.findOne({ email })
    .then((eMail) => {
      //console.log(eMail)
      if (eMail != null) {
        // var token = uuid.v4();
        const code = makeid();
        const timenow = new Date().getTime();
        const expire = timenow + 14400000;
        QuenMatKhau.create({ email: req.body.email, code, expire })
          .then((quenMatKhau) => {
            if (quenMatKhau) {
              sendMail(req.body.email, HTMLmail(code, email));
              return res.status(status.SUCCESS).json({
                success: true,
                msg: "Đã gửi mail... vui lòng kiểm tra mail của bạn !",
              });
            }
          })
          .catch((e) => noticeCrash(res));
        //res.json({ 'success': true, token, 'now':timenow, 'token':timetoken,expire})
      } else
        return res.status(status.INVALID_FIELD).json({
          success: false,
          errors: [{ msg: "Email không tồn tại", param: "email" }],
        });
    })
    .catch((e) => noticeCrash(res));
};
const hashPassWord = async (mat_khau) => {
  return await bcrypt.hash(mat_khau, 10);
};
const doiMatKhau = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(status.INVALID_FIELD)
      .json({ success: false, errors: errors.array() });
    return;
  }
  try {
    const { code, email } = req.params;
    const { mat_khau } = req.body;
    // console.log(req.params);
    const user = await QuenMatKhau.findOne({ code });
    console.log(user);
    if (!user) {
      return res.status(status.INVALID_FIELD).json({
        success: false,
        errors: [{ msg: "Mã xác nhận không hợp lệ", param: "code" }],
      });
    }
    if (email !== user.email) {
      return res.status(status.INVALID_FIELD).json({
        success: false,
        errors: [{ msg: "Email không tồn tại", param: "email" }],
      });
    }
    const timenow = new Date().getTime(); // thời gian hiện tại
    const timeUser = user.expire; // thời gian sử dụng của code
    const timePass = timeUser - timenow; // thời gian còn lại để sử dụng
    if (timePass <= 0) {
      res.status(status.INVALID_FIELD).json({
        success: false,
        errors: [{ msg: "Mã code hết hạn vui lòng thử lại", param: "code" }],
      });
    }
    const newPassword = await bcrypt.hash(mat_khau, 10);
    const ketQuaCapNhat = await SinhVien.updateOne(
      { email },
      { $set: { mat_khau: newPassword } }
    );
    if (ketQuaCapNhat) {
      const ketQuaXoaToken = await QuenMatKhau.updateMany(
        { email: req.body.email },
        { $set: { expire: -user.expire } }
      );
      if (ketQuaXoaToken) {
        return res.json({ success: true, msg: "Mật Khẩu đỗi thành công" });
      }
    }
  } catch {
    noticeCrash(res);
  }
};
const lamMoiToken = (req, res) => {
  code = makeid();
  var timenow = new Date().getTime();
  var expire = timenow + 14400000;
  QuenMatKhau.updateOne({ email: req.body.email, $set: { code, expire } })
    .then((quenMatKhau) => {
      if (quenMatKhau) {
        sendMail(req.body.email, HTMLmail(code));
        return res.json({
          success: true,
          msg: "Đã gửi lại mail... vui lòng kiểm tra mail của bạn !",
        });
      }
    })
    .catch((e) => noticeCrash(res));
};

const updateMatKhau = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(status.INVALID_FIELD)
      .json({ success: false, errors: errors.array() });
    return;
  }
  const { _id } = req.user;
  //console.log(_id);
  const { mat_khau_cu, mat_khau_moi } = req.body;
  SinhVien.findOne({ _id })
    .then((sv) => {
      //console.log(sv)
      if (sv == null) {
        return res.status(status.INVALID_FIELD).json({
          success: false,
          msg: "Sai id người dùng",
        });
      } else
        bcrypt
          .compare(mat_khau_cu, sv.mat_khau)
          .then((ketQua) => {
            // so sánh pass
            if (!ketQua) {
              return res.status(status.INVALID_FIELD).json({
                success: false,
                errors: [
                  {
                    param: "mat_khau_cu",
                    msg: "Mật khẩu cũ không đúng",
                  },
                ],
              });
            }
            hashPassWord(mat_khau_moi) // mã hóa pass
              .then((kq) => {
                if (kq) {
                  SinhVien.updateOne({ _id }, { $set: { mat_khau: kq } })
                    .then((up) => {
                      if (up) {
                        res.status(status.SUCCESS).json({
                          success: true,
                          msg: "Đỗi mật khẩu thành công!",
                        });
                      }
                    })
                    .catch((e) => noticeCrash(res));
                }
              })
              .catch((e) => noticeCrash(res));
          })
          .catch((e) => noticeCrash(res));
    })
    .catch((e) => noticeCrash(res));
};
module.exports = {
  suaThongTin,
  CapNhatAvatar,
  LoadThongTinSinhVien,
  quenMatKhau,
  doiMatKhau,
  lamMoiToken,
  updateMatKhau,
};
