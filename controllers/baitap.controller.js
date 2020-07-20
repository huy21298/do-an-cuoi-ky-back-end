/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const NguoiDung = require("../model/nguoidung.model");
const LopHoc = require("../model/lophoc.model");
const CauHoi = require("../model/cauhoi.model");
const BaiTap = require("../model/baitap.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");
 const loadbaiTap = (req, res )=>{
     const _id = req.params.id;
     BaiTap.findById({_id})
     .select("tieu_de noi_dung ngay_het_han nguoi_tao_id lop_hoc_id han_nop_bai")
     .populate({path:"nguoi_tao_id", select:"ho ten"})
     .populate({path:"lop_hoc_id", select:"tieu_de"})
     .then( baiTap => {
        res.json({ 'success': true,baiTap}).status(200);
     })
     .catch(e => noticeCrash(res));
 }
module.exports = { loadbaiTap}