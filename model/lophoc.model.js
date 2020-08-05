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
            virtual: true,
            getters: true,
          },
          toJSON: {
            virtual: true,
            getters: true,
          },
          timestamps: true,
    });

lopHocSchema.virtual("tieu_de_format").get(function() {
    if (this.tieu_de) {
        if (this.tieu_de.length <= 15) {
            return this.tieu_de;
        }
        return this.tieu_de.slice(0, 15) + "...";
    }
})


module.exports = mongoose.model("LopHoc", lopHocSchema, "lop_hoc");
