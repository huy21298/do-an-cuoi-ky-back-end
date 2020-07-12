/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const LopHoc = require("../model/lophoc.model");
const SinhVien = require("../model/sinhvien.model");
const NguoiDung = require("../model/nguoidung.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadDsSinhVienTrongLop = (req, res) => {

    const _id = req.params.id;
    LopHoc.findById({ _id }).select("tieu_de ds_sinh_vien nguoi_tao_id")
        .populate({ path: "nguoi_tao_id", select: "ho ten hoten" })
        .populate({ path: "ds_sinh_vien", select: "ho ten hoten" })
        .then(danhSach => {
            const data = {
                danhSach
            }
            res.json(data).status(200);
        })
        .catch(e => console.log(e));


}
module.exports = { loadDsSinhVienTrongLop }