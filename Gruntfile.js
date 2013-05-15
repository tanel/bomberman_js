module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'bomb.js',
				'enemy.js',
				'explosion.js',
				'gruntfile.js',
				'help_screen.js',
				'lives_object.js',
				'main.js',
				'player.js',
				'play_screen.js',
				'score_object.js',
				'score_screen.js',
				'title_screen.js',
				'coin_entity.js',
				'life_powerup_entity.js'
			]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['jshint']);
};