const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModelSchema = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const JwtExtraction = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");

const config = require("./config");

passport.use(new LocalStrategy(UserModelSchema.authenticate()));
passport.serializeUser(UserModelSchema.serializeUser());
passport.deserializeUser(UserModelSchema.deserializeUser());

exports.getToken = function (userId) {
  return jwt.sign(userId, config.secretKey, { expiresIn: 3600 });
};

exports.adminVerification = function (req, res, next) {
  if (req.user.admin === true) {
    next();
  } else {
    error = new Error(
      "Sorry " +
        req.user.username +
        ", but you are not authorized to perform this operation!"
    );
    error.status = 403;
    next(error);
  }
};

const options = {};
options.jwtFromRequest = JwtExtraction.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(options, function (jwt_payload, done) {
    console.log("JWT payload: ", jwt_payload);
    UserModelSchema.findOne({ _id: jwt_payload._id }, function (error, user) {
      if (error) {
        return done(error, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.userVerification = passport.authenticate("jwt", { session: false });
