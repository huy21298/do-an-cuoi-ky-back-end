/** Import third library */
const mongoose = require("mongoose");
const fs = require("fs");
/** Import model */
const BaiTap = require("../model/baitap.model");
const SinhVien = require("../model/sinhvien.model");
const NopBaiTap = require("../model/nopbaitap.model");
const Diem = require("../model/diem.model");

const status = require("../constant/status.constant");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
const loadbaiTap = (req, res) => {
  const _id = req.params.id;
  BaiTap.findById({ _id })
    .select("tieu_de noi_dung ngay_het_han nguoi_tao_id lop_hoc_id han_nop_bai")
    .populate({ path: "nguoi_tao_id", select: "ho ten" })
    .populate({ path: "lop_hoc_id", select: "tieu_de" })
    .then((baiTap) => {
      res.status(status.SUCCESS).json({ success: true, bai_tap: baiTap });
    })
    .catch((e) => noticeCrash(res));
};

const nopBaiTap = async (req, res) => {
  const { lop_hoc_id, bai_tap_id } = req.body;
  const { _id: sinh_vien_id } = req.user;
  try {
    const baiTap = await BaiTap.findOne({ _id: bai_tap_id, lop_hoc_id })
      .where("han_nop_bai")
      .gte(new Date())
      .where("trang_thai", 1)
      .where("ds_sinh_vien_da_lam")
      .nin(sinh_vien_id);

    console.log("baiTap", baiTap);

    if (!baiTap) {
      return res.status(status.INVALID_FIELD).json({
        success: false,
        errors: [
          {
            param: "id",
            msg: "Bài thi không tồn tại hoặc đã hết hạn",
          },
        ],
      });
    }

    const nopBaiTap = await NopBaiTap.create({
      bai_tap_id,
      lop_hoc_id,
      sinh_vien_id,
      bai_nop: "",
    });

    if (nopBaiTap) {
      const baiTap = await BaiTap.findByIdAndUpdate(
        { _id: bai_tap_id },
        { $push: { ds_sinh_vien_da_lam: sinh_vien_id } }
      );
      if (baiTap) {
        return res.status(status.SUCCESS).json({
          success: true,
          msg: "Nộp bài thi thành công",
        });
      }
      return noticeCrash(res);
    }

    noticeCrash(res);
  } catch {
    noticeCrash(res);
  }
};

const huyBaiTap = (req, res) => {
  const { bai_tap_id } = req.body;

  NopBaiTap.findOneAndDelete({ bai_tap_id })
    .then((huyBaiTap) => {
      console.log("huyBaiTap", huyBaiTap);
      if (huyBaiTap) {
        res
          .status(status.SUCCESS)
          .json({ success: true, msg: "Hủy bài tập thành công" });
      } else {
        res.status(status.INVALID_FIELD).json({
          success: false,
          errors: [
            {
              msg: "Hủy bài tập thất bại",
              param: "bai_tap_id",
            },
          ],
        });
      }
    })
    .catch((e) => noticeCrash(res));
};

const xemBaiTapHoanThanh = async (req, res) => {
  const bai_tap_id = mongoose.Types.ObjectId(req.params.bai_tap_id);
  const sinh_vien_id = mongoose.Types.ObjectId(req.user._id);
  try {
    // const diemBaiTap = await Diem.findOne({ ex_id: bai_tap_id, loai: "BaiTap" })

    const diemBaiTap = await Diem.findOne({ ex_id: bai_tap_id, loai: "BaiTap" })
      .populate({ path: "lop_hoc_id", select: "tieu_de" })
      .populate({
        path: "ex_id",
        match: { ds_sinh_vien_da_lam: { $in: sinh_vien_id } },
        populate: { path: "nguoi_tao_id", select: "ho ten hoten" },
        select: "tieu_de han_nop_bai han_nop_bai_format noi_dung tep_tin",
      });

    if (diemBaiTap) {
      return res.status(status.SUCCESS).json({
        msg: "Load bài tập thành công",
        success: true,
        bai_tap: diemBaiTap,
      });
    }
    return res.status(status.INVALID_FIELD).json({
      success: false,
      msg: "Load bài tập thất bại",
      errors: [{ param: "bai_tap_id", msg: "Bài tập không tồn tại" }],
    });
  } catch (e) {
    console.log("e", e);
  }
};

module.exports = { loadbaiTap, nopBaiTap, huyBaiTap, xemBaiTapHoanThanh };
