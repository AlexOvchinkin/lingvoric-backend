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
  return compilePug();
});

 /*
 / Styles task
*/
gulp.task('styles', function () {
  return compileStyles();
});

/*
 / Javascript task
*/
gulp.task('js', function () {
  return compileJavascript();
});

/*
 / Watcher
*/
gulp.task('watch', function () {
  gulp.watch(config.gulp.src.pug)
    .on('change', function(path, stats) {
      compilePug();
    });
   
  gulp.watch(config.gulp.src.js)
    .on('change', function(path, stats) {
      compileJavascript();
    });
    
  gulp.watch(config.gulp.src.stylesWatch)
    .on('change', function(path, stats) {
      compileStyles();
    });  
});

/*
 / browserSync task
*/
gulp.task('browserSync', function () {
  return browserSync({
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
gulp.task('default', gulp.parallel('pug', 'styles', 'js', 'watch', 'browserSync'));

/*
/////////////////////////////////////////////////////////
 / FUNCTIONS
*/
function compileJavascript() {
  return gulp.src(config.gulp.src.js)
          .pipe(uglify())
          .pipe(gulp.dest(config.gulp.build))
          .pipe(reload({ stream: true }));
}

function compileStyles() {
  gulp.src(config.gulp.src.stylesCompile)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.gulp.build))
    .pipe(reload({ stream: true }));
}

function compilePug() {
  return gulp.src(config.gulp.src.pug)
    .pipe(pug( { pretty: true } ))
    .pipe(gulp.dest(config.gulp.build))
    .pipe(reload({ stream: true }));
}