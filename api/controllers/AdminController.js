/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'login': function(req, res) {
    return res.view('login');
  },
  'signIn': function(req, res) {
    var params = req.params.all();
    if (params.Username === "TEST" && params.Password === "TEST") {
      req.session.authenticated = true;
      return res.redirect('/admin/newSong');
    } else {
      return res.redirect('/admin/login');
    }
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
