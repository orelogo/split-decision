module.exports = function(grunt) {

  grunt.initConfig({

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          {expand: true, cwd: 'src/', src: ['*.js'], dest: 'build/'},
          {expand: true, cwd: 'src/routes/', src: ['*'], dest: 'build/routes/'}
        ]
      }
    },

    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [
            ['babelify', {
              presets: ['es2015']
            }]
          ]
        },
        files: {
          './build/public/bundle.js': ['./src/public/script.js']
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/public/', src: ['*.html'], dest: 'build/public/'}
        ]
      }
    },

    watch: {
      files: ['src/**/*.js', 'src/**/*.html'],
      tasks: ['browserify', 'babel', 'copy'],
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['browserify', 'babel', 'copy', 'watch']);
};
