var gulp = require('gulp');
var glob = require('glob');
var plumber = require('gulp-plumber');
var browser = require("browser-sync");
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var ejs = require('gulp-ejs');


gulp.task('server', function() {
    browser({
        server: {
            baseDir: './build/'
        }
    });
});

gulp.task('css', function() {
    gulp.src('./src/scss/**/*.scss')
		.pipe(plumber())
        .pipe(sass({outputStyle: 'compact'}))
		.pipe(autoprefixer(['iOS >= 4','Android >= 2.3','Firefox ESR']))
		.pipe(csscomb())
		.pipe(csso())
        .pipe(gulp.dest('./build/css'))
		.pipe(browser.reload({stream:true}));
});
//
// gulp.task('default', function() {
//   var srcFiles;
//   srcFiles = glob.sync('./src/*.coffee');
//   return browserify({
//     entries: srcFiles,
//     transform: ['reactify']
//   })
//   .bundle()
//   .pipe(source('bundle.js'))
//   .pipe(gulp.dest('./build'));
// });

gulp.task('js', function(){
	srcFiles = glob.sync('./src/js/**/*.js');

	return browserify({
		entries: srcFiles,
		transform: ['reactify']
	})
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./build/js'));
});

// gulp.task('js', function(){
//
// 	var browserified = transform(function(filename){
// 		var b = browserify(filename);
// 		b.transform(reactify);
// 		b.add(filename);
// 		return b.bundle();
// 	});
//
// 	gulp.src(['./src/js/**/*.js'])
// 		.pipe(plumber())
// 		.pipe(browserified)
// 		.pipe(buffer())
// 		.pipe(sourcemaps.init({loadMaps: true}))
// 		.pipe(sourcemaps.write('./map'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./build/js'))
// 		.pipe(browser.reload({stream:true}));
// });

gulp.task('ejs', function() {
    gulp.src(['./src/html/**/*.ejs', '!./src/html/**/_*.ejs'])
        .pipe(ejs())
        .pipe(gulp.dest("./build"));
});


gulp.task('live',['server'], function() {
    gulp.watch('./src/js/**/*.js',['js']);
    gulp.watch('./src/scss/**/*.scss',['css']);
	gulp.watch('./src/html/**/*.ejs',['ejs']);
});
