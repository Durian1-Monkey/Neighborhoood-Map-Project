    
var gulp = require('gulp'),
  //  uglify = require('gulp-uglify'),
    jsmin = require('gulp-jsmin'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync').create(),
    critical = require('critical').stream;

var    beautify = require('gulp-beautify');
var    ghPages = require('gulp-gh-pages');

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
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

//Generate & Inline Critical-path CSS
gulp.task('critical', function() {
    return gulp.src('src/*.html')
    .pipe(critical({base: 'dist/', inline: true, css:['dist/style.css']}))
    .pipe(gulp.dest('dist/*.html'))
});


//Beautify JS file
gulp.task('beautify', function() {
    gulp.src('src/js/google.js')
    .pipe(beautify({indentSize: 4}))
    .pipe(gulp.dest('src/js/google.js'))
})


//Deploy gh-pages

gulp.task('deploy', function() {
    return gulp.src('dist/**/*')
    .pipe(ghPages());
});

//Watches JS
gulp.task('watch', function() {

    var server = livereload();

//    gulp.watch('src/js/google.js', ['beautify']);
    gulp.watch('src/js/google.js', ['scripts']);
    gulp.watch('src/style.css', ['styles']);
    gulp.watch('src/*.html', ['critical']);
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

gulp.task('default', ['deploy']);
//gulp.task('default', ['beautify']);
//gulp.task('default', ['watch', 'scripts', 'styles', 'critical']);