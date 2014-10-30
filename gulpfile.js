var gulp = require('gulp');
var config = require('./config');

require('gulp-task-loader')();

gulp.task('watch', ['setWatch'], function() {
  gulp.watch(config.html.src, ['html']);
  gulp.watch(config.tests.src, ['jshint', 'tests']);
  gulp.watch(config.assets.src, ['assets']);
  gulp.watch(config.configFiles, ['jshint']);
  gulp.watch(config.scripts.src, ['build']);
  gulp.watch(config.styles.src, ['styles']);
});

gulp.task('build', ['jshint', 'tests', 'browserify', 'styles', 'html', 'assets']);
gulp.task('default', ['build', 'serve', 'watch']);
