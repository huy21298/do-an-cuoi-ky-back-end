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
  const _id = req.user._id;
  console.log(_id);
  SinhVien.findById({ _id }).select("ds_lop_hoc ho ten") //load id từ sinh viên xem đc sinh viên đó tham gia lớp học nào
    .populate({ path: "ds_lop_hoc", select: "tieu_de nguoi_tao_id", populate: { path: "nguoi_tao_id", select: "ho ten hoten" } })
    .populate({path:"ds_cau_hoi.cau_hoi_id"})
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(403).json({ 'success': false, errors: errors.array() });
      return;
  }
  Invite.findOne({ code: req.body.code }) // tìm mã code
    .then(macode => {
      if (!macode) {
        res.json({ 'success': false, 'msg': 'Không có mã code này' }).status(403);
      } else if (macode.email === req.body.email) {
        if (macode.kich_hoat === Boolean(false)) {
          Invite.updateOne({ code: req.body.code }, { $set: { kich_hoat: Boolean(true) } })
            .then(kichHoat => {
              if (kichHoat) {
                SinhVien.findOne({ email: req.body.email })
                  .then(svien => {
                    const _id = mongoose.Types.ObjectId(macode.lop_hoc_id); // từ coDe ta có được id lớp học
                    const sinhvien = mongoose.Types.ObjectId(svien._id);
                    SinhVien.findByIdAndUpdate({ _id: sinhvien }, { $push: { ds_lop_hoc: _id } }) // thêm lớp học vào sinh viên
                      .then(sv => {
                        if (sv) {
                          LopHoc.findByIdAndUpdate({ _id }, { $push: { ds_sinh_vien: sinhvien } }) // thêm sinh viên vào lớp học
                            .then(lopHoc => {
                              res.json({ 'success': true, lopHoc }).status(200);
                            })
                            .catch(e => noticeCrash(res));
                        }
                      })
                      .catch(e => noticeCrash(res));
                  })
              }
            })
            .catch(e => noticeCrash(res));
        } else res.json({ 'success': true, 'msg': 'Bạn đã tham gia lớp' }).status(200);
      } else res.json({ 'success': false, 'msg': 'Sai email' }).status(403);
    })
    .catch(e => console.log(e));


}

module.exports = { loadLopHocThamGia, loadDsSinhVienTrongLop, loadBaiThiTrongMotLop, thamGiaLopHoc }