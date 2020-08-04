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
    .populate({ path: "ds_cau_hoi.cau_hoi_id" })
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

const thamGiaLopHoc = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json({ 'success': false, errors: errors.array() });
    return;
  }
  try {
    const { code } = req.body;
    const { email } = req.user;
    const maCode = await Invite.findOne({ code }).and({kich_hoat: false}).and({email});
    
    if (!maCode) {
      return res.status(403).json({ 'success': false, 'msg': 'Mã code không tồn tại hoặc đã được sử dụng' });
    }
    const updateTrangThaiCode = await Invite.updateOne({ code }, { $set: {kich_hoat: Boolean(true)}});

    if (updateTrangThaiCode) {

      const sinhVien = await SinhVien.findOne({ email });
      if (sinhVien) {

        const idLopHoc = mongoose.Types.ObjectId(maCode.lop_hoc_id);
        const idSinhVien = mongoose.Types.ObjectId(sinhVien._id);

        const updateLopHocSV = await SinhVien.findByIdAndUpdate({_id: idSinhVien}, {$push: { ds_lop_hoc: idLopHoc}});
        const lopHocDaThamGia = await LopHoc.findById(idLopHoc).select("tieu_de tieu_de_format").populate({ path: "nguoi_tao_id", select: "ho ten hoten anh_dai_dien"});
        
        if (updateLopHocSV) {
          const updateDSLopHoc = await LopHoc.findByIdAndUpdate({_id: idLopHoc }, { $push: { ds_sinh_vien: idSinhVien}});
          if (updateDSLopHoc) {
            return res.json({ 'success': true, "lop_hoc": lopHocDaThamGia, 'msg': "Tham gia lớp học thành công" }).status(200);
          }
        }

      }

    }

  } catch {
    noticeCrash(res);
  }
}


module.exports = { loadLopHocThamGia, loadDsSinhVienTrongLop, loadBaiThiTrongMotLop, thamGiaLopHoc }