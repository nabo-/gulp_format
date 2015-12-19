var gulp = require('gulp');
var glob = require('glob');
var plumber = require('gulp-plumber');
var browser = require("browser-sync");
var buffer = require('vinyl-buffer');
var through2 = require('through2');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var del = require('del');

var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var ejs = require('gulp-ejs');


var paths = {
    srcDir : './src',
    dstDir : './build',
    scssSrc : './src/scss',
    jsSrc : './src/js',
    imgSrc : './src/img'
};


gulp.task('server', function() {
    browser({
        server: {
            baseDir: './build/'
        }
    });
});


// sass
gulp.task('css', function() {
    gulp.src('./src/**/*.scss')
		.pipe(plumber())
        .pipe(sass({outputStyle: 'compact'}))
		.pipe(autoprefixer({
            browsers: ['iOS >= 4','Android >= 2.3','Firefox ESR'],
    		cascade: false
        }))
		.pipe(csscomb())
		.pipe(csso())
        .pipe(gulp.dest('./build/css'))
		.pipe(browser.reload({stream:true}));
});

// javascript Browserify
gulp.task('js', function(){
    gulp.src('./src/js/**/*.js')
		.pipe(plumber())
    	.pipe(through2.obj(function(file, encode, callback){
	        browserify(file.path, {
				transform: [reactify]
			})
	        .bundle(function(err, res){
	            file.contents = res;
	            callback(null, file);
	        });
	    }))
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(sourcemaps.write('./map'))
	    .pipe(gulp.dest('./build/js/'))
		.pipe(browser.reload({stream:true}));
});


gulp.task( 'imagemin', function(){
    var srcGlob = './src/img/**/*.+(jpg|jpeg|png|gif|svg)';
    var dstGlob = './build/img';
    var imageminOptions = {
        optimizationLevel: 7
    };

    gulp.src(srcGlob)
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(dstGlob));
});

// template
gulp.task('html', function() {
    gulp.src(['./src/html/**/*.ejs', '!./src/html/**/_*.ejs'])
        .pipe(ejs())
        .pipe(gulp.dest('./build'))
		.pipe(browser.reload({stream:true}));
});

// clean
gulp.task('clean', function(){
	del([
		'**/.DS_Store',
		'**/.sass-cache'
	]);
});

gulp.task('build', ['html', 'js', 'css', 'clean']);

gulp.task('live',['server'], function(){
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
	gulp.watch('./src/html/**/*.ejs', ['html']);
});
