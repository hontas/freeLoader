var gulp = require('gulp');
var config = require('../config');

module.exports = function() {
	gulp.src(config.html.src)
		.pipe(gulp.dest(config.dist));
};