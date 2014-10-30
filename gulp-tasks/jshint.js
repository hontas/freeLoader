var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../config');

module.exports = function() {
	gulp.src(config.configFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

	gulp.src(config.tests.src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

	return gulp.src(config.scripts.src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
};