<<<<<<< HEAD
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
=======
const { src, dest, task, watch, series, parallel } = require('gulp');

const concat 		= require('gulp-concat');
const cssmin 		= require('gulp-cssmin');
const uglify 		= require('gulp-uglify');
const babel 		= require('gulp-babel');
const rename 		= require('gulp-rename');
const replaceHtml	= require('gulp-html-replace');
const imagemin 		= require('gulp-imagemin');
const browserSync 	= require('browser-sync').create();

const ghpages 		= require('gulp-gh-pages');


// Project Source Variables 

let styleSrc 	= 'src/css/*.css';
let jsSrc		= 'src/js/*.js';
let htmlSrc		= 'src/*.html';
let imgSrc 		= 'src/img/**/*'
let copySrc  	= [ 'src/css/vendor/*',
					'src/css/fonts/*', 
					'src/css/img/*', 
					'src/assets/**/*', 
					'src/manifest.json',
					'src/sw.js',
					'src/browserconfig.xml',
					'src/.htaccess', 
					'src/js/vendor/*'];

function browser_sync(cb) {
	browserSync.init({
		server: {
			baseDir: 'dist/'
		}
	});
	cb();
};

function reload(cb) {
	browserSync.reload();
	cb();
};
// Replace style and script path in dest HTML files
function html(cb) {
	src(htmlSrc)
	.pipe(replaceHtml({
	'css': 'css/main.min.css',
	'js': 'js/main.min.js'
	}))
	.pipe(dest('dist'))
	.pipe(browserSync.stream());
	cb();
};

//Concat, minify  and rename css files
function css(cb) {
	src(styleSrc)
	  .pipe(concat('main.css'))
	  .pipe(cssmin())
	  .pipe(rename({
	    suffix: '.min', 
	  }))
	  .pipe(dest('dist/css'))
	  .pipe(browserSync.stream());
	  cb();
};

// Compile, minify and rename js files 
function js(cb){
   src(jsSrc)
      .pipe(babel({presets: ['@babel/env']}))
      .pipe(uglify())
	  .pipe(rename({suffix: '.min' }))
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream());
      cb();
};

//Optimize images
function images() {
	 return src(imgSrc)
		.pipe(imagemin())
		.pipe(dest('dist/img'))
		.pipe(browserSync.stream());
};


// Copy files and folders 
function copy() {
	return src(copySrc, {base:'src'})
		.pipe(dest('dist'))
		.pipe(browserSync.stream());
	
};

function watch_files() {
	watch(styleSrc, series(css, reload));
	watch(jsSrc, series(js, reload));
	watch(imgSrc, series(images, reload));
	watch(htmlSrc, series(html, reload));
	watch(copySrc, series(copy, reload));
}

/**
 * Push build to gh-pages
 */

function deploy(cb) {
   return src('./dist/**/*')
        .pipe(ghpages());
        cb();

};


task('html', html);
task('css', css);
task('js', js);
task('copy', copy);
task('images', images);
task('deploy', deploy);

task('default', parallel(html, css, js, images, copy)); 
task('watch', parallel(browser_sync, watch_files));

>>>>>>> e5f014668b1d897ba1d391d3b4e6ac262c52d441

