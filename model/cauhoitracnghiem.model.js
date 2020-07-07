const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cauHoiTracNghiemschema = new Schema({

    noi_dung : String,
    lua_chon_A : String,
    lua_chon_B : String,
    lua_chon_C : String,
    lua_chon_D : String,
    dap_an: String
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("CauHoiTracNghiem", cauHoiTracNghiemschema, "cau_hoi_trac_nghiem");
