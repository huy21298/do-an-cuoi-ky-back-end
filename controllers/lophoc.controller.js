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
const { validationResult } = require("express-validator");
const status = require("../constant/status.constant");

const loadLopHocThamGia = (req, res) => {
  const _id = req.user._id;
  //console.log(_id);
  SinhVien.findById({ _id })
    .select("ds_lop_hoc ho ten") //load id từ sinh viên xem đc sinh viên đó tham gia lớp học nào
    .populate({
      path: "ds_lop_hoc",
      select: "tieu_de nguoi_tao_id",
      populate: { path: "nguoi_tao_id", select: "ho ten hoten" },
    })
    .populate({ path: "ds_cau_hoi.cau_hoi_id" })
    .then((lopHoc) => {
      const data = {
        lopHoc,
      };
      res.json({ success: true, data }).status(200);
    })
    .catch((e) => noticeCrash(res));
};
const loadDsSinhVienTrongLop = (req, res) => {
  const _id = req.params.id;
  LopHoc.findById({ _id })
    .select("ds_sinh_vien")
    .populate({ path: "ds_sinh_vien", select: "ho ten hoten anh_dai_dien" })
    .then((danhSach) => {
      const data = {
        ds_sinh_vien: danhSach.ds_sinh_vien,
      };
      res.json({ success: true, data }).status(200);
    })
    .catch((e) => noticeCrash(res));
};
const loadBaiThiTrongMotLop = async (req, res) => {
  const { id } = req.params;
  try {
    const baiThi = await BaiThi.find({ lop_hoc_id: id })
      .select("tieu_de ngay_thi ngay_thi_format nguoi_tao_id duoc_phep_thi")
      .where("ds_sinh_vien_da_thi")
      .nin(req.user._id)
      .populate({ path: "nguoi_tao_id", select: "ho ten" });
    const baiThiData = baiThi.filter((item) => item.duoc_phep_thi === true);
    // const baiThiData = baiThi.filter(item => item.duoc_phep_thi === false);
    res.status(200).json({ success: true, bai_thi: baiThiData });
  } catch (e) {
    noticeCrash(res);
  }
};

// .then((dsBaiThi) => {
//     res.status(200).json({ success: true, bai_thi: dsBaiThi });
//   }) .catch((e) => noticeCrash(res));
// };

const loadBaiTapTrongMotLop = (req, res) => {
  const lop_hoc_id = mongoose.Types.ObjectId(req.params.id);
  BaiTap.find({ lop_hoc_id })
    .select("tieu_de han_nop_bai nguoi_tao_id noi_dung createdAt trang_thai")
    .where("han_nop_bai").gte(new Date())
    .where("trang_thai", true)
    .where("ds_sinh_vien_da_lam")
    .nin(req.user._id)
    .populate({ path: "nguoi_tao_id", select: "ho ten" })
    .then((baiTap) => {
      const data = {
        bai_tap: baiTap,
      };
      console.log('baiTap', baiTap)
      res.status(200).json({ success: true, data });
    })
    .catch((e) => noticeCrash(res));
};

const thamGiaLopHoc = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(status.INVALID_FIELD)
      .json({ success: false, errors: errors.array() });
    return;
  }
  try {
    const { code } = req.body;
    const { email } = req.user;
    const maCode = await Invite.findOne({ code })
      .and({ kich_hoat: false })
      .and({ email });

    if (!maCode) {
      return res.status(status.INVALID_FIELD).json({
        success: false,
        errors: [
          {
            msg: "mã code không tồn tại hoặc đã được sữ dụng",
            param: "code",
          },
        ],
      });
    }
    const updateTrangThaiCode = await Invite.updateOne(
      { code },
      { $set: { kich_hoat: Boolean(true) } }
    );

    if (updateTrangThaiCode) {
      const sinhVien = await SinhVien.findOne({ email });
      if (sinhVien) {
        const idLopHoc = mongoose.Types.ObjectId(maCode.lop_hoc_id);
        const idSinhVien = mongoose.Types.ObjectId(sinhVien._id);

        const updateLopHocSV = await SinhVien.findByIdAndUpdate(
          { _id: idSinhVien },
          { $push: { ds_lop_hoc: idLopHoc } }
        );
        const lopHocDaThamGia = await LopHoc.findById(idLopHoc)
          .select("tieu_de tieu_de_format")
          .populate({
            path: "nguoi_tao_id",
            select: "ho ten hoten anh_dai_dien",
          });

        if (updateLopHocSV) {
          const updateDSLopHoc = await LopHoc.findByIdAndUpdate(
            { _id: idLopHoc },
            { $push: { ds_sinh_vien: idSinhVien } }
          );
          if (updateDSLopHoc) {
            return res.status(status.SUCCESS).json({
              success: true,
              lop_hoc: lopHocDaThamGia,
              msg: "Tham gia lớp học thành công",
            });
          }
        }
      }
    }
  } catch {
    noticeCrash(res);
  }
};

const hanLamBai = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id)
    const data = [];
    const baiThi = await BaiThi.find({ lop_hoc_id: id })
    .select("tieu_de ngay_thi ngay_thi_format nguoi_tao_id duoc_phep_thi")
    .where("ds_sinh_vien_da_thi")
    .nin(req.user._id)
    .sort({ ngay_thi: 01 > Date()});

    console.log('baiThi', baiThi)

    const baiThiFilter = baiThi.filter(item => item.duoc_phep_thi === true)
    const countBaiTap = await BaiTap.findOne({ lop_hoc_id: id }).countDocuments();

    if (baiThiFilter.length > 0) {
      data.push(baiThiFilter[0]);
    }
    if (countBaiTap > 0) {
      const baiTap = await BaiTap.findOne({ lop_hoc_id: id })
        .select("tieu_de han_nop_bai")
        .sort({ han_nop_bai: -1 })
        .limit(1);
      data.push(baiTap);
    }
    if (data.length > 0) {
      return res
        .status(status.SUCCESS)
        .json({ success: true, data, msg: "Tải lịch nhắc thành công" });
    } else {
      return res
        .status(status.NOT_MAKE_SENSE)
        .json({ success: true, data, msg: "Không có dữ liệu nào" });
    }
  } catch (e) {
    console.log("e", e);
    noticeCrash(res);
  }
};
const layThongTinLopHoc = async (req, res) => {
  try {
    const { id } = req.params;
    const lopHoc = await LopHoc.findById(id)
      .select("nguoi_tao_id, tieu_de")
      .populate({ path: "nguoi_tao_id", select: "ho ten hoten anh_dai_dien" });
    return res.status(status.SUCCESS).json({ success: true, lop_hoc: lopHoc });
  } catch {
    noticeCrash(res);
  }
};

module.exports = {
  loadLopHocThamGia,
  loadDsSinhVienTrongLop,
  loadBaiThiTrongMotLop,
  thamGiaLopHoc,
  hanLamBai,
  loadBaiTapTrongMotLop,
  layThongTinLopHoc,
};