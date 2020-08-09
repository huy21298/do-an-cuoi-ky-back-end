const {check, validateResult} = require('express-validator');

let validateSuaThongTin = () => {
    return [
        check('ly_do', 'Lý do không được bỏ trống')
        .not()
        .isEmpty(),
        check('thong_tin_sua.ma_sv', 'Mã sinh viên không được bỏ trống'),
        check('thong_tin_sua.ma_sv', 'Mã sinh viên phải đủ 10 số').isLength({ min: 10 })
        .not()
        .isEmpty(),
        check('thong_tin_sua.ho', 'Họ của sinh viên không được bỏ trống')
        .not()
        .isEmpty(),
        check('thong_tin_sua.ten', 'Tên của sinh viên không được bỏ trống')
        .not()
        .isEmpty(),
        check('thong_tin_sua.ngay_sinh', 'Ngày sinh của sinh viên không được bỏ trống')
        .not()
        .isEmpty(),
        check('thong_tin_sua.sdt', 'Số điện thoại sinh viên không được bỏ trống')
        .not()
        .isEmpty(),
        check('thong_tin_sua.gioi_tinh', 'Giới tính sinh viên không được bỏ trống')
        .not()
        .isEmpty(),
        check('thong_tin_sua.email', 'Email của sinh viên không được bỏ trống'),
        check('thong_tin_sua.email', 'Email không đúng định dạng').isEmail()
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
        check('mat_khau', 'Mật khẩu không được bỏ trống')
            .not()
            .isEmpty(),
        check('mat_khau', 'Mật khẩu phải từ 6-24 kí tự').isLength({min: 6, max: 24})
    ];
}

let changePassWord = () => {
    return [
        check('email', 'email không được bỏ trống')
            .not()
            .isEmpty(),
        check('email', 'email không hợp lệ').isEmail(),
        check('mat_khau', 'Mật khẩu không được bỏ trống')
            .not()
            .isEmpty(),
        check('mat_khau', 'Mật khẩu phải từ 6-24 kí tự').isLength({min: 6, max: 24}),
    ];
}

let resetPassWord = () => {
    return [
        check('mat_khau_moi', 'Mật khẩu không được bỏ trống')
            .not()
            .isEmpty(),
        check('mat_khau_cu', 'Mật khẩu phải từ 6-24 kí tự').isLength({min: 6, max: 24}),
        check('mat_khau_cu', 'Mật khẩu không được bỏ trống')
            .not()
            .isEmpty(),
        check('mat_khau_moi', 'Mật khẩu phải từ 6-24 kí tự').isLength({min: 6, max: 24}),
    ];
}

let validateLopHoc = () => {
    return [
        check('code', 'code không được bỏ trống')
            .not()
            .isEmpty(),
    ];
}

module.exports = {validateSuaThongTin , validateLogin ,validateLopHoc,changePassWord,resetPassWord}