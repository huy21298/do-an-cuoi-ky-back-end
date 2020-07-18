/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const ChiTietBaiThi = require("../model/chitietbaithi.model");
const CauHoi = require("../model/cauhoi.model");
const BaiThi = require("../model/baithi-new.model");
const BaiThiGoc = require("../model/baithigoc.model");
const moment = require('moment');
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadBaiThi = (req, res) => {
    const _id = req.params.id;
    BaiThi.findById({ _id })
        .then(baiThi => {
            if (baiThi) {
                var countDownDate = new Date(moment(baiThi.ngay_thi).format('lll')).getTime();
                var now = new Date().getTime();
                var distance = countDownDate - now;
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (countDownDate - now < 0) {
                    res.json({ 'success': true, 'msg': 'Bạn đã hoàn thành' }).status(200);
                }
                else if (countDownDate - now > 0) {
                    endTime = days + "Ngày " + hours + "giờ "
                        + minutes + "phút " + seconds + "giây ";
                    res.json({ 'success': true, endTime }).status(200);
                }
                else return res.json({ 'success': true, baiThi }).status(200);

            }
        })
        .catch(e => noticeCrash(res));

}
module.exports = { loadBaiThi };