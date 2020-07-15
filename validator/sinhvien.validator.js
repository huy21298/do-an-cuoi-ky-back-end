const {check, validateResult} = require('express-validator');

let validateSuaThongTin = () => {
    return [
        check('ly_do', 'Lý do không được bỏ trống')
        .not()
        .isEmpty()
    ];
}

let validateLogin = () => {
    return [
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('email', 'email không hợp lệ').isEmail(),
        check('mat_khau', 'password không được bỏ trống')
            .not()
            .isEmpty(),
        check('mat_khau', 'password phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
}

module.exports = {validateSuaThongTin , validateLogin}