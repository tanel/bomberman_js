module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: [
				'bomb.js',
				'coin_entity.js',
				'enemy.js',
				'explosion.js',
                'flame_power_entity.js',
				'gruntfile.js',
				'help_screen.js',
				'life_powerup_entity.js',
				'lives_object.js',
				'main.js',
				'play_screen.js',
				'player.js',
                'range_object.js',
				'score_object.js',
				'score_screen.js',
				'title_screen.js'
			]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['jshint']);
};