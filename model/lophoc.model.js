const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lopHocSchema = new Schema({
    tieu_de: String,
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
    ds_sinh_vien: [{ type: Schema.Types.ObjectId, ref: "SinhVien" }],
    ds_bai_tap: [{ type: Schema.Types.ObjectId, ref: "BaiTap" }],
    ds_bai_thi: [{ type: Schema.Types.ObjectId, ref: "BaiThi" }],


},
    {
        toObject: {
            virtuals: true
        },
        toJson: {
            virtuals: true
        },
        timestamps: true,
    });

module.exports = mongoose.model("LopHoc", lopHocSchema, "lop_hoc");
