module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({       
        jshint:{
            options:{
                "esversion": 6
            },
            all: ['Gruntfile.js', 'app/**/*.js']
        }
    });
};