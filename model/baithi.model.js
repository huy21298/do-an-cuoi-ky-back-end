const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baiThiSchema = new Schema({
 
    id : Number,
    tieu_de : String, 
    lop_hoc_id : Number,
    ngay_thi : Date,
    thoi_gian_thi : Date,
    trang_thai : Boolean,
    nguoi_tao_id: [{ type: Schema.Types.ObjectId, ref: 'NguoiDung'}]
},{
    timestamps: true,
});

baiThiSchema.set("toObject", { virtuals: true});
baiThiSchema.set("toJSON", { virtuals: true});

module.exports = mongoose.model("BaiThi", baiThiSchema, "bai_thi");
