/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const ChiTietBaiThi = require("../model/chitietbaithi.model");
const CauHoi = require("../model/cauhoi.model");
const BaiThi = require("../model/baithi-new.model");
const BaiThiGoc = require("../model/baithigoc.model");

/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadBaiThi = (req , res ) => {

}
module.exports = { loadBaiThi };