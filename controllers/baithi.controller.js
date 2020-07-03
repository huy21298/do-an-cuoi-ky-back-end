/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const BaiThi = require("../model/baithi.model");
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");

/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadBaiThi = async (req, res) => {
  try {
    const _id = mongoose.Types.ObjectId("5efe033846557d129197dfe3");
    const baiThi = await BaiThi.findOne({ _id })
      .populate("lop_hoc_id", "tieu_de", LopHoc)
      .populate("nguoi_tao_id", "ho ten hoten", NguoiDung);
    const data = {
      baiThi,
    };
    res.json(data).status(400);
  } catch (e) {
    console.error(e.message);
    noticeCrash(res);
  }
};
module.exports = { loadBaiThi };
