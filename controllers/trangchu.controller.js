/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const SinhVien = require("../model/sinhvien.model");
const BaiThi = require("../model/baithi-new.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const loadLopHocThamGia = (req, res) => {
  const _id = mongoose.Types.ObjectId(req.params.id);
  SinhVien.findOne({ _id }).select("ds_lop_hoc ho ten")
    .populate({ path: "ds_lop_hoc", select: "tieu_de nguoi_tao_id", populate: { path: "nguoi_tao_id", select: "ho ten hoten" } })
    .then(lopHoc => {

      var id = lopHoc.ds_lop_hoc.map(i => i._id)
      //id này là id = ['idso1','idso2','idso3']
      const coPy = [];
      id.forEach(i => {
        const lop_hoc_id = mongoose.Types.ObjectId(i);
        BaiThi.find({ lop_hoc_id })
          .then(baiThiCuaLop => {
            coPy.push(baiThiCuaLop)
          })
          .catch(e => noticeCrash(res));
      });
      const data = {
        lopHoc,coPy
      }
      res.json(data).status(200);
    })
    .catch(e => console.log(e));
}


module.exports = { loadLopHocThamGia }