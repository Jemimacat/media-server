/**
 * MusicController
 *
 * @description :: Server-side logic for managing musics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const path = require('path');
const fs = require('fs');
const mediaserver = require('mediaserver');

module.exports = {
	index:function (req,res) {
		var params = req.params.all();
		var audioFile = path.join('assets/music/',params.song);
		mediaserver.pipe(req,res,path.resolve(audioFile));
	}
};
