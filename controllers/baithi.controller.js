/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const BaiThi = require("../model/baithi-new.model");
const TracNghiem = require("../model/cauhoitracnghiem.model");
const TuLuan = require("../model/cauhoituluan.model");
const BaiThiSinhVien = require("../model/baithisinhvien.model");
const Diem = require("../model/diem.model");
const moment = require("moment");
/** Import message notice function*/
const status = require("../constant/status.constant");
const { noticeCrash } = require("./notice-messages");

const loadBaiThi = async (req, res) => {
  let { id } = req.params;
  try {
    const baiThi = await BaiThi.findById(id)
      .where("ds_sinh_vien_da_thi")
      .nin(req.user._id)
      .where("trang_thai", true)
      .populate({ path: "nguoi_tao_id", select: "ho ten " })
      .populate({ path: "lop_hoc_id", select: "tieu_de" })
      .populate({
        path: "ds_cau_hoi.cau_hoi_id",
        select: "lua_chon.label lua_chon.id lua_chon.value diem noi_dung",
      });

    if (!baiThi) {
      return res.status(status.SUCCESS).json({
        success: false,
        errros: [
          {
            msg: "Bài thi không tồn tại hoặc đã được hoàn thành",
            param: id,
          },
        ],
      });
    }

    const ngayHienTai = moment(new Date());
    const ngayThi = moment(baiThi.ngay_thi);

    const ngay =
      ngayThi.date() < 10 ? "0" + ngayThi.date() : ngayThi.date() + "";
    const thang =
      ngayThi.month() + 1 < 10
        ? "0" + (ngayThi.month() + 1) + ""
        : ngayThi.month() + 1 + "";
    const gio =
      ngayThi.hour() < 10 ? "0" + ngayThi.hour() : ngayThi.hour() + "";
    const phut =
      ngayThi.minute() < 10 ? "0" + ngayThi.minute() : ngayThi.minute() + "";

    if (ngayHienTai < ngayThi) {
      const thoiGianConLai = ngayThi - ngayHienTai;
      return res.status(status.SUCCESS).json({
        success: false,
        msg: "Chưa tới thời gian thi",
        thoi_gian_con_lai: thoiGianConLai,
        ngay_thi: { ngay, thang, gio, phut },
        code: "SOON",
      });
    }

    if (!baiThi.duoc_phep_thi) {
      return res.status(status.SUCCESS).json({
        success: false,
        msg: "Đã quá thời gian thi, vui lòng liên hệ với giao viên phụ trách",
        code: "LEFT",
      });
    }

    return res.status(status.SUCCESS).json({
      success: true,
      data: {
        bai_thi: baiThi,
      },
    });
  } catch (e) {
    console.log("e", e);
    noticeCrash(res);
  }
};

const nopBaiThi = async (req, res) => {
  const { bai_thi } = req.body;
  const { _id } = req.user;
  const data = JSON.parse(bai_thi);
  try {
    const ketQua = await BaiThiSinhVien.create(data);
    if (!ketQua) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        msg:
          "Có lỗi xãy ra trong qua trình gửi bài thi. Nếu vẫn còn bị trường hợp này, vui lòng báo cho giáo viên phụ trách",
      });
    }
    const updateTrangThai = await BaiThi.findOneAndUpdate(
      { _id: data.bai_thi_id },
      { trang_thai: true, $push: { ds_sinh_vien_da_thi: _id } }
    );

    if (updateTrangThai) {
      return res.status(status.SUCCESS).json({
        success: true,
        msg: "Nộp bài thành công, nhấn xác nhận để quay về trang lớp học",
      });
    }
    return res.status(status.INVALID_FIELD).json({
      success: false,
      msg: "Nộp bài thi thất bại",
      errors: [
        {
          param: "bai_thi_id",
          msg: "Bài thi không tồn tại hoặc đã xảy ra lỗi trong quá trình nộp",
        },
      ],
    });
  } catch (e) {
    console.log("e", e);
    noticeCrash(res);
  }
};

const loadBaiThiHoanThanh = async (req, res) => {
  const { bai_thi_id, lop_hoc_id } = req.query;
  const { _id: sinh_vien_id } = req.user;

  try {
    const baiThi = await BaiThi.find({ _id: bai_thi_id, lop_hoc_id })
      .where("ds_sinh_vien_da_thi")
      .in(sinh_vien_id)
      .where("trang_thai", true)
      .populate({ path: "nguoi_tao_id", select: "ho ten " })
      .populate({ path: "lop_hoc_id", select: "tieu_de" })
      .populate({
        path: "ds_cau_hoi.cau_hoi_id",
        select: "lua_chon.label lua_chon.id lua_chon.value diem noi_dung",
      });
    if (baiThi) {
      console.log("baiThi", baiThi);
    }
  } catch (e) {
    console.log("e", e);
    noticeCrash(res);
  }
};

const xemDiemBaiThi = async (req, res) => {
  const { bai_thi_id, lop_hoc_id } = req.query;
  const { _id: sinh_vien_id } = req.user;

  const diemBaiThi = await Diem.findOne({
    sinh_vien_id,
    lop_hoc_id,
    ex_id: bai_thi_id,
    loai: "BaiThi",
  })
    .populate({ path: "chi_tiet_bai_lam.cau_hoi_id" })
    .populate({ path: "sinh_vien_id", select: "ho ten hoten ma_sv" });
  const baiThi = await BaiThi.findById(bai_thi_id)
    .where("trang_thai", true)
    .select("tieu_de thoi_gian_thi");

  if (diemBaiThi) {
    return res.status(status.SUCCESS).json({
      success: true,
      msg: "Tải bài thi thành công",
      data: {
        bai_thi: diemBaiThi,
        ct_bai_thi: baiThi,
      },
    });
  }

  return res.status(status.INVALID_FIELD).json({
    success: true,
    msg: "Tải bài thi thất bại",
    errors: [{ param: "bai_thi_id", msg: "Bài thi không tồn tại" }],
  });
};
module.exports = { loadBaiThi, nopBaiThi, loadBaiThiHoanThanh, xemDiemBaiThi };
