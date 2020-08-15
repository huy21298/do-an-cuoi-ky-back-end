const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chiTietBaiLam = new Schema({
    cau_hoi_id: {type: Schema.Types.ObjectId, refPath: 'chi_tiet_bai_lam.loai'},
    cau_tra_loi: String,
    dung_sai: Boolean,
    loai: {type: String, enum:['TuLuan', 'TracNghiem']}
})

const diemSchema = new Schema({
    diem: Number,
    sinh_vien_id: {type: Schema.Types.ObjectId, ref: 'SinhVien'},
    lop_hoc_id: {type: Schema.Types.ObjectId, ref :'LopHoc'},
    ex_id: {type: Schema.Types.ObjectId, refPath:'loai'},
    chi_tiet_bai_lam: [chiTietBaiLam],
    loai: {type: String, enum:['BaiTap', 'BaiThi'], default: 'BaiTap'},
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });
module.exports = mongoose.model("Diem", diemSchema, "diem");
