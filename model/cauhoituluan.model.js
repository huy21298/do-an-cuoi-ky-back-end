const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cauHoiTuLuanschema = new Schema({

    noi_dung: {type: String, required: true},
    diem: {type: Number, required: true},
    danh_muc: {type: Schema.Types.ObjectId, required: true, ref: 'DanhMuc'},
    nguoi_tao_id: {type: Schema.Types.ObjectId, required: true, ref:'NguoiDung'},
    trang_thai: {type: Boolean, default: true},

},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("TuLuan", cauHoiTuLuanschema, "cau_hoi_tu_luan");
