var gulp = require('gulp');
var config = require('../config');

module.exports = function() {
	gulp.src(config.assets.src)
		.pipe(gulp.dest(config.dist + '/assets'));
};