const mongoose = require("mongoose");
const moment = require("moment");

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
  anh_dai_dien: {
    type: String,
    default: ""
  },
  email: String,
  ngay_sinh: Date,
  sdt: String,
  gioi_tinh: Boolean,
  mat_khau: String,
  nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
  ds_lop_hoc: [{ type: Schema.Types.ObjectId, ref: "LopHoc", default: [] }],
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
sinhVienSchema.virtual("ngay_sinh_format").get(function() {
  return moment(this.ngay_sinh).format("DD/MM/yyyy") + "";
});
sinhVienSchema.virtual("gioi_tinh_format").get(function() {
  return this.gioi_tinh ? "Nam" : "Nữ"
});
module.exports = mongoose.model("SinhVien", sinhVienSchema, "sinh_vien");