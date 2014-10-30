var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');

module.exports = function() {
  connect.server({
    root: 'dist',
    port: config.server.port,
    livereload: true
  });
};