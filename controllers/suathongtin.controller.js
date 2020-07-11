/** Import third library */
const mongoose = require("mongoose");
/** Import model */
const SuaThongTin = require("../model/suathongtin.model");
/** Import message notice function*/
const { noticeCrash } = require("./notice-messages");

const suaThongTin = (req, res) => {

   // console.log(req.boby.ly_do);
    const nguoi_dung_id = mongoose.Types.ObjectId(req.params.id);
    const ly_do = req.body.ly_do;
    SuaThongTin.create(
        {'nguoi_dung_id':nguoi_dung_id ,
        'ly_do': ly_do,
        'trang_thai': false
        })
        .then(suaThongTin => {
            res.json(suaThongTin).status(200);
        }).catch(e => console.log(e));
}
module.exports = { suaThongTin }