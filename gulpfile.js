const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');




// COPY FILES and FOLDERS
gulp.task('copy', done => {
	gulp.src(
		['src/css/img/*', 
		'src/css/vendor/*',
		'src/css/fonts/*', 
		'src/assets/**/*', 
		'src/404.html', 
		'src/index.html', 
		'src/gallery.html', 
		'src/manifest.json',
		'src/sw.js',
		'src/browserconfig.xml',
		'src/.htaccess', 
		'src/js/vendor/*' ]
		,{base: 'src'})
	.pipe(gulp.dest('dist'));

	 done();
});


gulp.task('replacePath', done => {
  gulp.src('src/*.html')
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/main.min.js'
    }))
    .pipe(gulp.dest('dist/'));

     done();
});

//MINIFY VENDOR CSS
// gulp.task('stylesVendor', done => {
// 	gulp.src('src/css/vendor/lightgallery.css')
// 	  .pipe(cssmin())
// 	  .pipe(rename({
// 	    suffix: '.min', 
// 	  }))
// 	  .pipe(gulp.dest('dist/css/vendor'));

// 	  done();
// });


//CONCAT AND MINIFY CSS
gulp.task('styles', done => {
	gulp.src('src/css/*.css')
	  .pipe(concat('main.css'))
	  .pipe(cssmin())
	  .pipe(rename({
	    suffix: '.min', 
	  }))
	  .pipe(gulp.dest('dist/css'));

	  done();
});


// COMPILE and MINIFY JS MAIN
gulp.task('scripts', done =>{
	gulp.src('src/js/*.js')
	  .pipe(babel({
	      presets: ['@babel/preset-env']
	  }))
	  .pipe(uglify())
	  .pipe(rename({
	    suffix: '.min'
	  }))
	  .pipe(gulp.dest('dist/js/'));

	   done();
});

//Optimize Images
gulp.task('images', done =>{
	gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
	  done();	
});

//REPLACE CSS AND JS FILE PATHS IN HTML 

gulp.task('replacePath', done => {
  gulp.src('dist/*.html')
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/main.min.js'
    }))
    .pipe(gulp.dest('dist/'));
     done();
});


gulp.task('default', gulp.parallel('copy','styles','scripts','images', 'replacePath')); 
// gulp.task('default', gulp.series(gulp.parallel('copy','styles','scripts','images'), 'replacePath')); 

 // gulp.task('default', done => {
 // 	gulp.parallel('copy','styles','scripts','images', 'replacePath');
 // 	done();
 // }); 






