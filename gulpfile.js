    
var gulp = require('gulp'),
  //  uglify = require('gulp-uglify'),
    jsmin = require('gulp-jsmin'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync').create();


gulp.task('default', () => {
    console.log("Helo");
});



// Concats & minifies js files and outputs them to build/js/app.js 
gulp.task('scripts', function () {
    gulp.src('src/js/google.js')
        .pipe(uglify())
        .pipe(jsmin())
//        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload());
});

//Compress css file 
gulp.task('styles', function () {
    return gulp.src('src/style.css')
    .pipe(cssmin())
  //  .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

//Watches JS
gulp.task('watch', function() {

    var server = livereload();

    gulp.watch('src/js/google.js', ['scripts']);
//    gulp.watch('src/*.html', ['scripts']);
    gulp.watch('src/style.css', ['styles']);
});




/*
// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "src/js/*.js"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/js/*.js", ['js-watch']);
});
*/
//gulp.task('default', ['watch', 'js', 'js-watch', 'serve']);
gulp.task('default', ['watch', 'scripts', 'styles']);




