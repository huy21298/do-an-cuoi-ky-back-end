const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nopBaiTapSchema = new Schema({
 
  bai_tap_id: { type: Schema.Types.ObjectId, ref: "BaiTap" },
  sinh_vien_id: { type: Schema.Types.ObjectId, ref: "SinhVien" },
  lop_hoc_id: { type: Schema.Types.ObjectId, ref: "LopHoc" },
  bai_nop : String
},
{
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
});

module.exports = mongoose.model("NopBaiTap", nopBaiTapSchema, "nop_bai_tap");
