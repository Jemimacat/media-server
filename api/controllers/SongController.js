/**
 * SongController
 *
 * @description :: Server-side logic for managing musics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index:function (req,res) {
        Song.find().exec(function (err,songs) {
            return res.view('songs',{songs:songs});
        });
    }
};
