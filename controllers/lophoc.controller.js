/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
const BaiTap = require("../model/baitap.model");
const BaiThi = require("../model/baithi-new.model");
const Invite = require("../model/invite.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const { validationResult } = require('express-validator');

const loadLopHocThamGia = (req, res) => {
  const _id = req.params.id;
  SinhVien.findById({ _id }).select("ds_lop_hoc ho ten")
    .populate({ path: "ds_lop_hoc", select: "tieu_de nguoi_tao_id", populate: { path: "nguoi_tao_id", select: "ho ten hoten" } })
    .then(lopHoc => {
      const data = {
        lopHoc
      }
      res.json({ 'success': true, data }).status(200);
    })
    .catch(e => noticeCrash(res));
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
      res.json({ 'success': true, data }).status(200);
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
          res.json({ 'success': true, data }).status(200);
        })
        .catch(e => noticeCrash(res));
    })
    .catch(e => noticeCrash(res));
}

const thamGiaLopHoc = (req, res) => {
  const code = req.body.code;
  const email = req.body.email;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     res.status(200).json({ 'success': false, errors: errors.array() });
  //     return;
  // }
  Invite.findOne({ code }) // tìm mã code
    .then(coDe => {
      if (coDe) {
        if (coDe.email === email) { //  mail được mời === mail từ req.body
          Invite.updateOne({ code }, { $set: { kich_hoat: Boolean(true) } }) // update lại trạng thái
            .then(kichHoat => {
              if (kichHoat) {
                SinhVien.findOne({ email }) // tìm ra sinh viên được mời bằng mail
                  .then(sinhVien => {
                    if (sinhVien) {
                      const _id = mongoose.Types.ObjectId(coDe.lop_hoc_id); // từ coDe ta có được id lớp học
                      const svien = mongoose.Types.ObjectId(sinhVien._id); 
                      LopHoc.findByIdAndUpdate({_id},{$push: {ds_sinh_vien: svien}})
                      .then( lopHoc =>{
                        res.json({ 'success': true,lopHoc }).status(200);
                      })
                      .catch(e => noticeCrash(res));
                    }
                  })
                  .catch(e => noticeCrash(res));
              }
            })
            .catch(e => noticeCrash(res));
        }
        else return res.json({ 'success': false, 'msg': 'Email của bạn bị sai' }).status(200);
      } else return res.json({ 'success': false, 'msg': 'Nhập mã sai' }).status(204);
    })
    .catch(e => noticeCrash(res));

}

module.exports = { loadLopHocThamGia, loadDsSinhVienTrongLop, loadBaiThiTrongMotLop, thamGiaLopHoc }