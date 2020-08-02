/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const ChiTietBaiThi = require("../model/chitietbaithi.model");
const CauHoi = require("../model/cauhoi.model");
const TracNghiem = require("../model/cauhoitracnghiem.model");
const TuLuan = require("../model/cauhoituluan.model");
const BaiThi = require("../model/baithi-new.model");
const BaiThiGoc = require("../model/baithigoc.model");
const moment = require('moment');
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const { populate } = require("../model/nguoidung.model");

const loadBaiThi = (req, res) => {
    const _id = req.params.id;
    // BaiThi.findOne({_id})
    // .populate({ path:"nguoi_tao_id", select:"ho ten "})
    // .populate({path:"lop_hoc_id", select:"tieu_de"})
    // .populate({path:"ds_cau_hoi.cau_hoi_id", select:"lua_chon.label lua_chon.value , noi_dung"})
    // .then( baiThi => {
    //     //console.log(baiThi)
    //    if (!baiThi){
    //         res.json({ 'success': true, 'msg': 'Không có bài thi này' }).status(200);
    //     } else
    //     res.json({ 'success': true, baiThi }).status(200);
    // })
    // .catch(e => console.log(e));
    BaiThi.findById({ _id })
        .populate({ path: "nguoi_tao_id", select: "ho ten " })
        .populate({ path: "lop_hoc_id", select: "tieu_de" })
        .populate({ path: "ds_cau_hoi.cau_hoi_id", select: "lua_chon.label lua_chon.value , noi_dung" })
        .then(baiThi => {
            if (baiThi) {
                var countDownDate = new Date(moment(baiThi.ngay_thi).format('lll')).getTime(); //Jan 5, 2021 15:31:21
                var now = new Date().getTime(); // thời gian hiện tại
                var distance = countDownDate - now; // thời gian còn lại
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                console.log(countDownDate - now)
                if (now > countDownDate + 900000) { // nếu time hiện tại > time thi +15p 
                    res.json({ 'success': true, 'msg': 'Bạn đã hoàn thành' }).status(200);
                }
                else if (countDownDate - now > 0) {
                    endTime = days + "Ngày " + hours + "giờ "
                        + minutes + "phút " + seconds + "giây ";
                    res.json({ 'success': true, endTime }).status(200);
                }
                else if (countDownDate - now === 0 || now < countDownDate + 900000) { // nếu time hiện tại < time thi +15p 
                    res.json({ 'success': true, baiThi }).status(200);
                }
            }
        })
        .catch(e => noticeCrash(res));
}
module.exports = { loadBaiThi };