var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var browserify = require('gulp-browserify');
var ejs = require("gulp-ejs");


gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task("css", function() {
    gulp.src("./src/scss/**/*.scss")
		.pipe(plumber())
        .pipe(sass({outputStyle: 'compact'}))
		.pipe(autoprefixer(['iOS >= 4','Android >= 2.3','Firefox ESR']))
		.pipe(csscomb())
		.pipe(csso())
        .pipe(gulp.dest("./build/css"))
		.pipe(browser.reload({stream:true}));
});


gulp.task("js", function() {
    gulp.src("./src/js/**/*.js")
		.pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"))
		.pipe(browser.reload({stream:true}));
});


gulp.task("ejs", function() {
    gulp.src(["./src/html/**/*.ejs", "!./src/html/**/_*.ejs"])
        .pipe(ejs())
        .pipe(gulp.dest("./build"));
});


gulp.task("live",['server'], function() {
    gulp.watch("./src/js/**/*.js",["js"]);
    gulp.watch("./src/scss/**/*.scss",["css"]);
	gulp.watch("./src/html/**/*.ejs",["ejs"]);
});
