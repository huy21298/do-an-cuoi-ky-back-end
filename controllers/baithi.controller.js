/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const BaiThi = require("../model/baithi-new.model");
const TracNghiem = require("../model/cauhoitracnghiem.model");
const TuLuan = require("../model/cauhoituluan.model");
const moment = require('moment');
/** Import message notice function*/
const status = require("../constant/status.constant");
const { noticeCrash } = require("./notice-messages");

const loadBaiThi = (req, res) => {
    const _id = req.params.id;
    // //console.log(_id);

    //  BaiThi.findById({ _id })   /** cái này dùng đễ load bài thi thử */
    // .populate({ path: "nguoi_tao_id", select: "ho ten " })
    // .populate({ path: "lop_hoc_id", select: "tieu_de" })
    // .populate({ path: "ds_cau_hoi.cau_hoi_id", select: "lua_chon.label lua_chon.value , noi_dung" })
    // .then( (baiThi) => {
    //     if (!baiThi){
    //         return res.status(status.INVALID_FIELD).json({   
    //             success: false,
    //             errors: [
    //               {
    //                 msg: "Bài thi không tồn tại",
    //                 param: "_id",
    //               },
    //             ],
    //           }); 
    //     } else { 
    //         // var countDownDate = new Date(moment(baiThi.ngay_thi,["DD/MM/yyyy","LLL"])).getTime(); //Jan 5, 2021 15:31:21
    //         // console.log(countDownDate)
    //         const data = {
    //             baiThi
    //         }
    //         return res.status(status.INVALID_FIELD).json({data:[data]})
    //      }
    // })
    // .catch(e => console.log(e));

    BaiThi.findById({ _id })
        .populate({ path: "nguoi_tao_id", select: "ho ten " })
        .populate({ path: "lop_hoc_id", select: "tieu_de" })
        .populate({ path: "ds_cau_hoi.cau_hoi_id", select: "lua_chon.label lua_chon.value , noi_dung" })
        .then(baiThi => {
            if (baiThi) {
                // console.log(baiThi)
                var countDownDate = new Date(moment(baiThi.ngay_thi, ["DD/MM/yyyy", "LLL"])).getTime(); // tính ra milis
                var now = new Date().getTime(); // thời gian hiện tại
                var distance = countDownDate - now; // thời gian còn lại
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                //console.log(countDownDate - now)
                if (now > countDownDate + 900000) { // nếu time hiện tại > time thi +15p 
                    res.json({ 'success': false, 'msg': 'Đã qua thời gian làm bài' }).status(status.INVALID_FIELD);
                }
                else if (countDownDate - now > 0) {
                    endTime = days + "Ngày " + hours + "giờ "
                        + minutes + "phút " + seconds + "giây ";
                    res.json({ 'success': true, endTime }).status(200);
                }
                else if (countDownDate - now === 0 || now < countDownDate + 900000) { // nếu time hiện tại < time thi +15p 
                    res.status(status.SUCCESS).json({ 'success': true, baiThi });
                }
            } else {
                return res.status(status.INVALID_FIELD).json({
                    success: false,
                    errors: [
                        {
                            msg: "Bài thi không tồn tại",
                            param: "_id",
                        },
                    ],
                });
            }
        })
        .catch(e => noticeCrash(res));
}
module.exports = { loadBaiThi };