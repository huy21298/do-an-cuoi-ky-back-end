const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lopHocSchema = new Schema({
    id: Number,
    tieu_de: String,
    nguoi_tao_id: { type: Schema.Types.ObjectId, ref: "NguoiTao" },
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
