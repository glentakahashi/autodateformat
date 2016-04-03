module.exports = function(grunt) {

  grunt.initConfig({
    targethtml: {
      dist: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },
    ts: {
      default: {
        tsconfig: true,
        options: {
          additionalFlags: '--outFile dist/app/main.js'
        }
      }
    },
    compass: {
      default: {
        options: {
          config: 'compass.rb',
          environment: 'production'
        }
      }
    },
    clean: {
      dist: ["dist"],
      dev: ["dev"],
    },
    uglify: {
      dist: {
        mangle: false,
        files: {
          'dist/app/main.min.js': ['dev/app/main.js']
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean', 'targethtml:dist', 'ts', 'compass']);
};
