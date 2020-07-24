const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sinhVienSchema = new Schema({
  ma_sv: String,
  ho: {
    type: String,
    get: function (value) {
      return value[0].toUpperCase() + value.slice(1).toLowerCase(); //
    }, // giau => Giau
    set: function (value) {
      return value.toLowerCase(); // GIAU => giau
    },
  },
  ten: {
    type: String,
    get: function (value) {
      return value[0].toUpperCase() + value.slice(1).toLowerCase(); // giau
    },
    set: function (value) {
      return value.toLowerCase();
    },
  },
  anh_dai_dien : String,
  email: String,
  ngay_sinh: Date,
  sdt :Number,
  gioi_tinh: String,
  mat_khau : String,
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
