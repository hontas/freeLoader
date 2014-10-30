module.exports = {
	html: { src: './src/html/**/*.html' },
	tests: { src: ['./src/tests/**/*test.js'] },
	scripts: { entry: './src/js/main.js', src: './src/js/**/*.js' },
	assets: { src: './src/assets/**/*' },
	styles: { entry: './src/styles/style.less', src: './src/styles/**/*.less' },
	configFiles: './*.js',

	server: {
		port: 3000,
		livereloadport: 35729
	},

	dist: './dist',
	distJs: './dist/js',
	distCss: './dist/css',
	outputName: 'freeLoader.js',

	browserify: {
		debug: true,
	}
};