const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const pump = require('pump');

let copySrc = ['src/css/vendor/*',
				'src/css/fonts/*', 
				'src/assets/**/*', 
				'src/manifest.json',
				'src/sw.js',
				'src/browserconfig.xml',
				'src/.htaccess', 
				'src/js/vendor/*'];


//Replace script and styles paths in HTML files 
gulp.task('replacePath', done => {
  gulp.src('src/*.html')
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/main.min.js'
    }))
    .pipe(gulp.dest('dist'));
    done();
});

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
gulp.task('scripts', () =>
   gulp.src('src/js/*.js')
      .pipe(babel({
            presets: ['@babel/env']
        }))
      .pipe(uglify())
	  .pipe(rename({
	    suffix: '.min'
	  }))
      .pipe(gulp.dest('dist/js/'))
);
//Optimize Images
gulp.task('images', done =>{
	gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
	  done();	
});


// COPY FILES and FOLDERS
gulp.task('copy', done => {
	gulp.src( copySrc
		,{base: 'src'})
	.pipe(gulp.dest('dist'));

	 done();
});


gulp.task('default', gulp.series('styles','scripts','images','copy', 'replacePath')); 

gulp.task('watch', function(){
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('src/css/*.css', gulp.series('styles'));
	gulp.watch('src/img/**/*', gulp.series('images'));
	gulp.watch('src/*.html', gulp.series('replacePath'));
	gulp.watch(copySrc, gulp.series('copy'));
});




