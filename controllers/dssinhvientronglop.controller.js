/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadDsSinhVienTrongLop = (req, res) => {

    const _id = mongoose.Types.ObjectId(req.params.id);
    LopHoc.find({_id})
        .populate({ path: "nguoi_tao_id" , select:"ho ten hoten"})
        .populate({path :"ds_sinh_vien", select:"ho ten hoten"})
        .then(danhSach => {
            const data = {
                danhSach
            }
            res.json(data).status(200);
        })
        .catch(e => noticeCrash(res));


}
module.exports = { loadDsSinhVienTrongLop }