module.exports = function(grunt) {
  grunt.initConfig({
    // For error detection
    jshint: {
      files: ['Gruntfile.js', '*.js', 'models/*.js', 'public/javascripts/*.js', 'routes/*.js', 'test/**/*.js'],
      options: {
        multistr: true,
        unused: true,
        globals: {
          jQuery: true
        }
      }
    },

    // For style checking
    jscs: {
      files: ['<%= jshint.files %>'],
      options: {
        'preset': 'google',
        'maximumLineLength': false
      }
    },

    // For test running
    karma: {
      options: {
        configFile: 'test.conf.js'
      },
      unit: {
        singleRun: true,
        autoWatch: true
      }
    },

    // For auto-restarting server on code change
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    // For auto-running tasks on code change
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['build']
    },

    // For running multiple grunt tasks concurrently
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', ['jshint', 'jscs', 'karma:unit']);
  grunt.registerTask('default', ['concurrent:target']);
};