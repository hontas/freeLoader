var browserify = require('browserify');
var source = require('vinyl-source-stream');
var config = require('../config');
var gulp = require('gulp');

module.exports = function() {
    return browserify({ debug: config.browserify.debug })
        .add(config.scripts.entry).bundle()
        .pipe(source(config.outputName))
        .pipe(gulp.dest(config.distJs))
};