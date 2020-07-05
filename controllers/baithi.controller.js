/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const BaiThi = require("../model/baithi.model");
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const ChiTietBaiThi = require("../model/chitietbaithi.model");
const CauHoi = require("../model/cauhoi.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadBaiThi = (req, res) => {

  const _id = mongoose.Types.ObjectId(req.params.id);
  BaiThi.findOne({ _id })
    .populate({path: "lop_hoc_id" , select : "tieu_de"}) /** Lấy ra tiêu đề của lớp học đó */
    .populate({path: "nguoi_tao_id" , select: "ho ten hoten"}) /**  Lấy ra người tạo lớp học đó */
    .populate({path: "cau_hoi_id" , select : "noi_dung dap_an_a dap_an_b dap_an_c dap_an_d diem "}) /** lây ra ds câu hỏi */
    .then((thongTinBaiThi) => {
      const data = {
        thongTinBaiThi
      }
      res.json(data).status(200);
    })
    .catch(e => noticeCrash(res));
};



module.exports = { loadBaiThi };