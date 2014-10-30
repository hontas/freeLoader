var karma = require('karma');
var notify = require('gulp-notify');

module.exports = function(done) {
	function tell() {
		notify({
			title: 'tests',
			message: 'ran successfully'
		});
		done();
	}
    karma.server.start({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: true
    }, tell);
};