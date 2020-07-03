const mongoose = require("mongoose");
const SinhVien = require("../model/sinhvien.model");
const BaiThi = require("../model/baithi.model");
const ChiTietBaiThi = require("../model/chitietbaithi.model");
const CauHoi = require ("../model/cauhoi.model");
const NguoiDung = require("../model/nguoidung.model");

const Tieu_De = (req, res) =>
{
    // BaiThi.find().
    // populate({ path :"nguoi_tao_id" , select : "hoten-_id" })
    // .then(data => {
    //     if(data)
    //     res.json(data).status(200);

    // })
    // .catch(err => console.log(err));
    

}
module.exports = {Tieu_De}