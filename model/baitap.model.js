const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const baiTapSchema = new Schema({
  tieu_de: String,
  noi_dung: String,
  nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
  lop_hoc_id : { type: Schema.Types.ObjectId, ref: "LopHoc" },
  han_nop_bai: Date,
  tep_tin : String,
  trang_thai: Boolean,
  ds_sinh_vien_tham_gia: Array,
  ds_sinh_vien_da_lam: [{
    type: Schema.Types.ObjectId,
    ref: "SinhVien"
  }],
  createdAt: {
    type: Date,
    get: v => moment(v).format("DD/MM/yyyy") + ""
  }
},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

baiTapSchema.virtual("han_nop_bai_format").get(function() {
  return moment(this.han_nop_bai).format("DD/MM HH:mm") + ""
});

baiTapSchema.virtual("trang_thai_format").get(function() {
  return this.trang_thai ? "Phát hành" : "Bản nháp"
});

module.exports = mongoose.model("BaiTap", baiTapSchema, "bai_tap");
