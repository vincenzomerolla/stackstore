'use strict';
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
// console.log(UserModel)

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'facebook.id': profile.id }, function (err, user) {
            // console.log(profile)

            if (err) return done(err);

            if (user) {
                done(null, user);
            } else {
                UserModel.create({
                    facebook: {
                        id: profile.id,
                    },
                    firstName: profile._json.first_name,
                    lastName: profile._json.last_name,
                    email: profile.profileUrl,
                    password: "1234",
                    photoUrl: 'http://graph.facebook.com/'+profile.id+'/picture'
                }).then(function (user) {
                    done(null, user);
                });
            }

        });

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/user');
        });

};