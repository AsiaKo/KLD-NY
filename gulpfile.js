const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
// const livereload = require('gulp-livereload');
// const browserSync = require('browser-sync').create();


// copy of HTML files 
gulp.task('copyHTML', function(){
	gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));	
});

// Optimize Images
gulp.task('imageMin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
      
});

// Minify JS 
gulp.task('scripts', function () {
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'));	
});

// Minify CSS
gulp.task('styles', function () {
    gulp.src('src/**/*.css')
    	.pipe(concat('css/main.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));       
});


gulp.task('watch', function(){	
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/images/*', gulp.series('imageMin'));
	gulp.watch('src/**/*.css', gulp.series('styles'));
	gulp.watch('src/*.html', gulp.series('copyHTML'));
});

gulp.task('default', gulp.parallel('copyHTML', 'imageMin', 'scripts', 'styles', 'watch'));

