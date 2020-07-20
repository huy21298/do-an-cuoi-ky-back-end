/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
const BaiTap = require("../model/baitap.model");
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
const loadDsSinhVienTrongLop = (req, res) => {

  const _id = req.params.id;
  LopHoc.findById({ _id }).select("tieu_de ds_sinh_vien nguoi_tao_id")
      .populate({ path: "nguoi_tao_id", select: "ho ten hoten" })
      .populate({ path: "ds_sinh_vien", select: "ho ten hoten" })
      .then(danhSach => {
          const data = {
              danhSach
          }
          res.json({ 'success': true,data}).status(200);
      })
      .catch(e => noticeCrash(res));

}
const loadBaiThiTrongMotLop = (req, res) => {

  const lop_hoc_id = mongoose.Types.ObjectId(req.params.id)
  BaiThi.find({ lop_hoc_id }).select("tieu_de ngay_thi nguoi_tao_id")
      .populate({ path: "nguoi_tao_id", select: "ho ten" })
      .then(dsBaiThi => {
          BaiTap.find({ lop_hoc_id }).select("tieu_de han_nop_bai nguoi_tao_id")
              .populate({ path: "nguoi_tao_id", select: "ho ten" })
              .then(baiTap => {
                  const data = {
                      dsBaiThi, baiTap
                  }
                  res.json({ 'success': true,data}).status(200);
              })
              .catch(e => noticeCrash(res));
      })
      .catch(e => noticeCrash(res));
}
module.exports = { loadLopHocThamGia,loadDsSinhVienTrongLop,loadBaiThiTrongMotLop }