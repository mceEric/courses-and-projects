const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const jwtExtraction = require("passport-jwt").ExtractJwt;

const config = require("./config");
const UserModel = require("./models/UserModel");

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const options = {};

options.jwtFromRequest = jwtExtraction.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.JWT_SECRET;

exports.jwtPassport = passport.use(
  new jwtStrategy(options, function (jwtPayload, cb) {
    console.log("JWT payload: ", jwtPayload);
    return UserModel.findOne({ _id: jwtPayload._id }, function (error, user) {
      if (error) {
        return cb(error, false);
      } else if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    });
  })
);

exports.userVerification = passport.authenticate("jwt", { session: false });

exports.adminVerification = function (req, res, next) {
  if (req.user.admin) {
    next();
  } else {
    (error = new Error(
      "Sorry " +
        req.user.username +
        ", but you are not authorised to perfrom this operation."
    )),
      (error.status = 403);
    next(error);
  }
};
