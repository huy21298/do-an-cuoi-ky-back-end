const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const baiTapSchema = new Schema({
  tieu_de: String,
  noi_dung: String,
  nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
  lop_hoc_id : { type: Schema.Types.ObjectId, ref: "LopHoc" },
  han_nop_bai: {
    type: Date,
      required: true,
      get: v => moment(v).format("DD/MM/yyyy") + ""
  },
  tep_tin : String,
  trang_thai: {
    type: Boolean,
    default: true,
    get: (v) => {
      return v === true ? "Phát hành" : "Bản nháp";
    },
  },
  ds_sinh_vien_tham_gia : Array
},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("BaiTap", baiTapSchema, "bai_tap");
