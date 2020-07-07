const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiGocschema = new Schema({

    bai_thi_duoc_lien_ket : Number
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("BaiThiGoc", baiThiGocschema, "bai_thi_goc");
