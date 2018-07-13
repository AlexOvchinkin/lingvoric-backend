const config      = require('./config');
const gulp        = require('gulp');
const sass        = require('gulp-sass');
const prefixer    = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const pug         = require('gulp-pug');
const uglify      = require('gulp-uglify')

const reload = browserSync.reload;

 /*
 / pug task
*/
gulp.task('pug', function () {
  return gulp.src(config.gulp.src.pug)
    .pipe(pug( { pretty: true } ))
    .pipe(gulp.dest(config.gulp.build))
    .pipe(reload({ stream: true }));
});


 /*
 / Styles task
*/
gulp.task('styles', function () {
  gulp.src(config.gulp.src.stylesCompile)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.gulp.build))
    .pipe(reload({ stream: true }));
});

/*
 / Javascript task
*/
gulp.task('js', function () {
  gulp.src(config.gulp.src.js)
    .pipe(uglify())
    .pipe(gulp.dest(config.gulp.build))
    .pipe(reload({ stream: true }));
});

/*
 / Watcher
*/
gulp.task('watch', function () {
  gulp.watch(config.gulp.src.pug, ['pug']);
  gulp.watch(config.gulp.src.js, ['js']);
  gulp.watch(config.gulp.src.stylesWatch, ['styles']);
});

/*
 / browserSync task
*/
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './dist'
    },
    open: true,
    notify: false
  });
});


/*
 / DEFAULT task
*/
gulp.task('default', ['pug', 'styles', 'js', 'watch', 'browserSync']);