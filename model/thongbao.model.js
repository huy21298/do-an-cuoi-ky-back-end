const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thongBaoSchema = new Schema({
    tieu_de: String,
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiDung" },
    ds_sinh_vien: [{ type: Schema.Types.ObjectId, ref: "SinhVien" }],
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

module.exports = mongoose.model("ThongBao", thongBaoSchema, "thong_bao");
