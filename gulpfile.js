    
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    jsmin = require('gulp-jsmin'),
    htmlmin = require('gulp-htmlmin'),
    critical = require('critical').stream;


gulp.task('default', () => {
    console.log("Helo");
});

// Compiles scss files and outputs them to build/css/*.css
gulp.task('styles', function(){
	return gulp.src('./build/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./build/'));

});

// Concats & minifies js files and outputs them to build/js/app.js 
gulp.task('scripts', function () {
	gulp.src('./build/*.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./build/'));
});

// Minifies our HTML files and outputs them to build/*.html
gulp.task('html', function() {
  return gulp.src('./build/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
		.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/'))
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('./build/*.html')
        .pipe(critical({base: './', inline: true, css: ['./build/style.min.css']}))
        .pipe(rename({suffix: '.critical'}))
        .pipe(gulp.dest('./build/critical/'));
});

gulp.task('default', ['styles', 'scripts', 'html']);




