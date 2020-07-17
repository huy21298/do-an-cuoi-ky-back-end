/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
const BaiThi = require("../model/baithi-new.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadLopHocThamGia = (req, res) => {
  const _id = req.params.id;
  SinhVien.findById({ _id }).select("ds_lop_hoc ho ten")
    .populate({ path: "ds_lop_hoc", select: "tieu_de nguoi_tao_id", populate: { path: "nguoi_tao_id", select: "ho ten hoten" } })
    .then(lopHoc => {
      const data = {
        lopHoc
      }
      res.json({ 'success': true,data}).status(200);
    })
    .catch( e => noticeCrash(res));
}


module.exports = { loadLopHocThamGia }