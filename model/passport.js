var localStategy = require('passport-local').Strategy;
var passport = require('passport');
var bcrypt = require('bcrypt');
const { noticeCrash } = require("../controllers/notice-messages");

const SinhVien = require("../model/sinhvien.model");
module.exports = function () {
    passport.use(new localStategy({
        usernameField: 'email',
        passwordField: 'mat_khau'
    }, function (email, mat_khau, done) {
        SinhVien
            .findOne({email: email})
            .then(user => {
                if (!user) 
                    return done(null, false, {message: 'Email không đúng'})
                if (  bcrypt.compareSync(mat_khau, user.mat_khau) ) 
                    return done(null, user) 
                return done(null, false, {message: 'Mật khẩu không đúng'})
            }).catch(e => console.log(e));
    }))
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}