/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
const BaiThi = require("../model/baithi-new.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadBaiThiTrongMotLop = (req, res) => {

    const lop_hoc_id = mongoose.Types.ObjectId(req.params.id)
    BaiThi.find({lop_hoc_id }).select("tieu_de ngay_thi nguoi_tao_id")
        .populate({path: "nguoi_tao_id", select: "ho ten"})
        .then(dsBaiThi => {
            const data = {
                dsBaiThi
            }
            res.json(data).status(200);
        })
        .catch(e => console.log(e));
}
module.exports = { loadBaiThiTrongMotLop }