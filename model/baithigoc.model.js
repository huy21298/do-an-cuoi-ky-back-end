const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiGocschema = new Schema({
    id : {type: Schema.Types.ObjectId, ref: "BaiThi"},
    ds_cau_hoi: Array,
},
    {
        timestamps: true,
        toObject: { virtuals: true, getters: true },
        toJSON: { virtuals: true, getters: true },
    });

module.exports = mongoose.model("BaiThiGoc", baiThiGocschema, "bai_thi_goc");
