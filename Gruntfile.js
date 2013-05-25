module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'*.js'
			]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['jshint']);
};