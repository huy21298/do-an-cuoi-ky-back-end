const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const opts = {};
const SinhVien = require("../model/sinhvien.model");
const jwt = require("jsonwebtoken");

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${process.env.JWT_PRIVATE_KEY}`;

module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, (payload, done) => {
            SinhVien.findOne({email: payload.email})
            .then(sinhVien => {
                if (!sinhVien) return done(null, false);
                return done(null, sinhVien)
            })
            .catch(err => JSON.stringify(err))
        })
    );
};
