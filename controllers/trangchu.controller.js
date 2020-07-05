/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const ChiTietSinhVienLopHoc = require("../model/chitietsinhvienlophoc.model");
const SinhVien = require("../model/sinhvien.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadLopHocThamGia = (req, res) => {
    const sinh_vien_id = mongoose.Types.ObjectId(req.params.id);
    ChiTietSinhVienLopHoc.find({sinh_vien_id})
        .populate({ path:"lop_hoc_id" , select: "tieu_de"})
        .populate({path:"sinh_vien_id", select: "ho ten hoten"})
        .then((lopHoc) => {
            const data = {
                lopHoc
            }
            res.json(data).status(200);
        }).catch(e => noticeCrash(res));

}
module.exports = { loadLopHocThamGia }