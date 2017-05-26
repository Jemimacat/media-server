/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const CryptoJs = require('crypto-js');
module.exports = {
  'login': function(req, res) {
    return res.view('login');
  },
  'signIn': function(req, res) {
    var params = req.params.all();

    var cipherText = CryptoJs.SHA256(params.Password).toString();
    console.log(cipherText)
    User.findOne({
        username: params.Username,
        encryptedPassword: cipherText
    }).exec((err,user) =>{
        if (err || !user) {
            req.session.destroy();
            return res.redirect('/admin/login');
        }else if (user) {
            req.session.authenticated = true;
            return res.redirect('/admin/newSong');
        }
    })
  },
  'newSong': function(req, res) {
    return res.view('newSong');
  },
  'addSong': function(req, res) {
    req.file('songFile').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/Music')
    }, function(err, uploadedFiles) {

      var song = uploadedFiles[0];
      var fileNameParts = song.fd.split('\\');
      var fileName = fileNameParts[fileNameParts.length - 1];

      Song.create({
        name: song.filename,
        fileName: fileName
      }).exec(function(err, song) {
        if (err) {
          sails.log(err);
        }
        return res.redirect('/song');
      });

    });


  }
};
