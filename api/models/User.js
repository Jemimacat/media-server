/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var CryptoJS = require("crypto-js");

module.exports = {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
    },
    encryptedPassword: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },
  beforeCreate: function(values, next) {
    // Encrypt
    var ciphertext = CryptoJS.SHA256(values.encryptedPassword).toString();
    values.encryptedPassword = ciphertext;
    next();
  }
};
