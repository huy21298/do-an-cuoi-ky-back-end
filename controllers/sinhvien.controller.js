/** Import third library */
const mongoose = require("mongoose");
const fs = require("fs");
const nodemailer = require('nodemailer');
var uuid = require("uuid");
const moment = require('moment');
const bcrypt = require('bcrypt')
/** Import model */
const SuaThongTin = require("../model/suathongtin.model");
const SinhVien = require("../model/sinhvien.model");
const QuenMatKhau = require("../model/quenmatkhau.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const { validationResult } = require('express-validator');
const { compareSync } = require("bcrypt");

const LoadThongTinSinhVien = (req, res) => {

    const _id = req.params.id;
    SinhVien.findById({ _id }).select("ma_sv ho ten email ngay_sinh anh_dai_dien mat_khau sdt")
        .then(thongTinSinhVien => {
            const data = {
                thongTinSinhVien
            }
            res.json({ 'success': true, data }).status(200);

        })
        .catch(e => noticeCrash(res));

}
const suaThongTin = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({ 'success': false, errors: errors.array() });
        return;
    }
    const nguoi_dung_id = mongoose.Types.ObjectId(req.params.id);
    //const ma_sv = req.body.thong_tin_sua.ma_sv;
    // const ho = req.body.thong_tin_sua.ho;
    // const ten = req.body.thong_tin_sua.ten;
    // const ngay_sinh = req.body.thong_tin_sua.ngay_sinh;
    // const gioi_tinh = req.body.thong_tin_sua.gioi_tinh;
    // const sdt = req.body.thong_tin_sua.sdt;
    // const email = req.body.thong_tin_sua.email;
    //console.log(req.body);
    //console.log(req.body.thong_tin_sua.email)
    SuaThongTin.create(
        {
            'nguoi_dung_id': nguoi_dung_id,
            'ly_do': req.body.ly_do,
            'thong_tin_sua': {
                ma_sv: req.body.thong_tin_sua.ma_sv,
                ho: req.body.thong_tin_sua.ho,
                ten: req.body.thong_tin_sua.ten,
                ngay_sinh: req.body.thong_tin_sua.ngay_sinh,
                gioi_tinh: req.body.thong_tin_sua.gioi_tinh,
                sdt: req.body.thong_tin_sua.sdt,
                email: req.body.thong_tin_sua.email
            },
            'trang_thai': Boolean(false),
            'la_sinhvien': Boolean(true)
        })
        .then(suaThongTin => {
            if (suaThongTin) {
                res.json({ 'success': true, 'msg': "Thông tin đã được gửi , chờ phê duyệt" }).status(200);
                //console.log(suaThongTin.thong_tin_sua)
            }

        }).catch(e => noticeCrash(res));
}
const CapNhatAvatar = (req, res) => {
    const _id = req.params.id;
    SinhVien.findById({ _id })
        .then(user => {
            if (user) {
                const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
                let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
                orgName = orgName.trim().replace(/ /g, "-")
                const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
                // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
                const newFullPath = `${fullPathInServ}-${orgName}`;
                fs.renameSync(fullPathInServ, newFullPath);
                req.body.anh_dai_dien = orgName;
                const _id = req.params.id
                SinhVien.updateOne({ _id }, { $set: { anh_dai_dien: req.body.anh_dai_dien } })
                    .then(aVaTar => {
                        if (aVaTar) {
                            res
                                .status(200)
                                .json({ 'success': true, 'msg': 'Cập nhật avatar thàng công', 'fileNameInServer': orgName });
                        }
                    })
                    .catch(e => noticeCrash(res));
            }
        })
        .catch(e => noticeCrash(res));

}

const sendMail = (user, link) => {
    const option = {
        service: 'gmail',
        auth: {
            user: 'giauvo02051999@gmail.com', // email hoặc username
            pass: 'giau02051999' // password
        }
    };
    var transporter = nodemailer.createTransport(option);
    transporter.verify(function (error, success) {
        // Nếu có lỗi.
        if (error) {
            console.log(error);
        } else { //Nếu thành công.
            console.log('Kết nối thành công!');
            var mail = {
                from: 'giauvo02051999@gmail.com', // Địa chỉ email của người gửi
                to: user, // Địa chỉ email của người gửi
                subject: 'Cập nhật lại mật khẩu', // Tiêu đề mail
                text: link, // Nội dung mail dạng text
            };
            //Tiến hành gửi email
            transporter.sendMail(mail, function (error, info) {
                if (error) { // nếu có lỗi
                    console.log(error);
                } else { //nếu thành công
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}
const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
HTMLmail = (code) => {
    return ` 

    http://localhost:3000/api/v1/password/doi-mat-khau/${code} `
}

const quenMatKhau = (req, res) => {
    const email = req.body.email;
    SinhVien.findOne({ email })
        .then(eMail => {
            if (eMail != null) {
                // var token = uuid.v4();
                const code = makeid();
                const timenow = new Date().getTime();
                const expire = timenow + 3600 * 60*60;
                QuenMatKhau.create({ email: req.body.email, code, expire })
                    .then(quenMatKhau => {
                        if (quenMatKhau) {
                            sendMail(req.body.email, HTMLmail(code));
                            return res.json({ 'success': true, 'msg': "Đã gửi mail... vui lòng kiểm tra mail của bạn !" });
                        }
                    })
                    .catch(e => noticeCrash(res));
                //res.json({ 'success': true, token, 'now':timenow, 'token':timetoken,expire})
            }
            else return res.json({ 'success': 'Mail không phải sinh viên' })
        })
        .catch(e => noticeCrash(res));
}
const hashPassWord = (mat_khau) => {
    return bcrypt.hash(mat_khau, 10)
}
const doiMatKhau = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(200).json({ 'success': false, errors: errors.array() });
        return;
    }
    const code= req.body.code ;
    const email= req.body.email ;
    QuenMatKhau.findOne({ email :req.body.email , code: req.body.code})
        .then(user => {
            if (user) {
                const timenow = new Date().getTime();
                const timeUser = user.expire;
                const timePass = timeUser - timenow;
                if (timePass > 0) {
                    //pwd = bcrypt.hash(req.body.mat_khau, 10)
                    // console.log(timePass)
                    SinhVien.updateOne({ email: req.body.email }, { $set: { mat_khau: req.body.mat_khau } })
                        .then(pass => {
                            if (pass) {
                                QuenMatKhau.deleteMany({ email })
                                    .then(kq => {
                                        if (kq) {
                                            return res.json({ 'success': true, 'msg': "Mật Khẩu đỗi thành công" });
                                        }
                                    })
                                    .catch(e => noticeCrash(res));
                            }
                        })
                        .catch(e => noticeCrash(res));
                } else return res.json({ 'success': false, 'msg': "Mã code hết hạn vui lòng gửi lại" });
            } //else return res.json({ 'success': 'email hoặc code sai' });
        })
        .catch(e => noticeCrash(res));
}
const resetCode = (req, res) => {
    code = makeid();
    var timenow = new Date().getTime();
    var expire = timenow + 3600 * 60;
    QuenMatKhau.update({ email: req.body.email, $set: { code, expire } })
        .then(quenMatKhau => {
            if (quenMatKhau) {
                sendMail(req.body.email, code);
                return res.json({ 'success': true, 'msg': "Đã gửi mail... vui lòng kiểm tra mail của bạn !" });
            }
        })
        .catch(e => noticeCrash(res));
}

module.exports = { suaThongTin, CapNhatAvatar, LoadThongTinSinhVien, quenMatKhau, doiMatKhau, resetCode }