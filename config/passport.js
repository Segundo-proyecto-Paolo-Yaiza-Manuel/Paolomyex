const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require("bcrypt")
const dotenv = require("dotenv").load()


module.exports = function() {
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })


  passport.deserializeUser((id, cb) => {

    User.findById(id, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  })

  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    },
    (req, dniNumber, password, next) => {

      console.log('AAAAAAAAAAAAAAAA');
      console.log(req.files)
      process.nextTick(() => {
        User.findOne({
          'username': dniNumber
        }, (err, user) => {
          if (err) {
            return next(err);
          }
          if (user) {
            return next(null, false)
          } else {
            const hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
            const newUser = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              address: req.body.address,
              dniNumber: req.body.username,
              phone: req.body.phoneNumber,
              email: req.body.email,
              password: hashPass,
              imgDniFront: `${req.files.dniFront[0].path}`,
              imgDniBack: `${req.files.dniBack[0].path}`
            });

            newUser.save((err) => {
              if (err) {
                next(err);
              }
              return next(null, newUser);
            });
          }
        });
      });
    }));

  passport.use('local-login', new LocalStrategy((dniNumber, password, next) => {
    User.findOne({
      dniNumber
    }, (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return next(null, false, {
          message: "Incorrect dni"
        })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: "Incorrect password"
        })
      }
      return next(null, user);
    });
  }));
}
