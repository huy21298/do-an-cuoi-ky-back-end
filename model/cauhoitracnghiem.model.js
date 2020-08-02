const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const luachon = new Schema({id: String, label: String, value: String,}, {_id: false});
const dapAn = new Schema({id: String, value: String}, {_id: false});
const cauHoiTracNghiemschema = new Schema({
    noi_dung: {type: String, require: [true, 'Nội dung phải được nhập']},
    diem: {type: Number, required: true},
    lua_chon: [luachon],
    dap_an: dapAn,
    danh_muc: {type: Schema.Types.ObjectId, ref:'DanhMuc'},
    nguoi_tao_id: {type: Schema.Types.ObjectId, ref:'NguoiDung'},
    trang_thai: {type: Boolean, default: true},
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("TracNghiem", cauHoiTracNghiemschema, "cau_hoi_trac_nghiem");
