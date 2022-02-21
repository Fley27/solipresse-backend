const jwtStrategy = require("passport-jwt").Strategy,
    extractJwt = require("passport-jwt").ExtractJwt;

const user = require("../../api/user/model");

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "solipresse",
};

module.exports = (passport) => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, done) => {
            user
                .findById(jwt_payload.id)
                .then((user) => {
                    if (user) return done(null, user);{
                        console.log("kkk")
                        return done(null, false);
                    }
                })
                    .catch((err) => {
                        console.log("kkk")
                        return done(err, false, { message: "Server Error" });
                    });
            })
    );
};