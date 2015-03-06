'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
//change schema to userSchema here
var userSchema = new mongoose.Schema({
    isAdmin:{
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    },
    photoUrl: {
      type: String
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    salt: {
      type: String
    },
    twitter: {
      id: String,
      username: String,
      token: String,
      tokenSecret: String
    },
    facebook: {
      id: String
    },
    google: {
      id: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

userSchema.pre('save', function (next) {

  var user = this;

  if (user.isModified('password')) {
      user.salt = generateSalt();
      user.password = encryptPassword(user.password, user.salt);
  }

  next();

});

userSchema.method('correctPassword', function (candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', userSchema);