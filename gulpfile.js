'use strict';

// Load plugins
const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS task
function css() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch('./src/scss/**/*', css);
}

function html() {
  gulp.watch('./build/index.html', browserSyncReload);
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync, html);

// export tasks
exports.watch = watch;
