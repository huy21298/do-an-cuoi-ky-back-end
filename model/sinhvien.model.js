const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sinhVienSchema = new Schema({
  ma_sv: String,
  ho: String,
  ten: String,
  anh_dai_dien : String,
  email: String,
  ngay_sinh: Date,
  nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
  ds_lop_hoc : [{ type: Schema.Types.ObjectId, ref: "LopHoc" }],
},
{
  toObject: {
    virtual: true,
    getters: true,
  },
  toJSON: {
    virtual: true,
    getters: true,
  },
  timestamps: true,
});
sinhVienSchema.virtual("hoten").get(function () {
  return this.ho + " " + this.ten;
});
module.exports = mongoose.model("SinhVien", sinhVienSchema, "sinh_vien");
