var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config');

function logMsg(err) {
	gutil.log(gutil.colors.cyan('less error'), gutil.colors.red(err.message));
	gutil.beep();
}

module.exports = function() {
	return gulp.src(config.styles.entry)
		.pipe(sourcemaps.init())
		.pipe(less().on('error', logMsg))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.distCss))
};