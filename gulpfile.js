
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
let htmlSubSrc	= 'src/projects/*.html';
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


// Replace style and script path in dest sub-folder HTML files
function htmlSub(cb) {
	src(htmlSubSrc)
	.pipe(replaceHtml({
	'cssSub': '../css/main.min.css',
	'jsSub': '../js/main.min.js'
	
	}))
	.pipe(dest('dist/projects'))
	.pipe(browserSync.stream());
	cb();
};

 //Concat, minify  and rename css files
function css() {
	return src(styleSrc)
	  .pipe(concat('main.css'))
	  .pipe(cssmin())
	  .pipe(rename({
	    suffix: '.min', 
	  }))
	  .pipe(dest('dist/css'))
	  .pipe(browserSync.stream());

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

//Optimize images and cache
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
	watch(htmlSubSrc, series(htmlSub, reload));
	watch(copySrc, series(copy, reload));
}

/**
 * Push build to gh-pages - "gulp deploy"
 */

function deploy(cb) {
   return src('./dist/**/*')
        .pipe(ghpages());
        cb();

};


task('html', html);
task('htmlSub', htmlSub);
task('css', css);
task('js', js);
task('copy', copy);
task('images', images);
task('deploy', deploy);

task('default', parallel(html, htmlSub, css, js, images, copy)); 
task('watch', parallel(browser_sync, watch_files));


