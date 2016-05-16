/* REQUIRE
=========================================*/
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

/* TASKS
=========================================*/
// SASS
var onError = function(err){
	console.log(err);
}
gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
          browsers : ['last 2 versions'],
          cascade : false
        }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.stream());
})

// JS
// tache a ajouter par la suite

/* WATCH
=========================================*/
gulp.task('default', ['sass'], function() {
  browserSync.init({
    // notify: false,
    server: { baseDir: './app/' }
  });
  gulp.watch('app/scss/**/*.scss', ['sass']).on('change', function(event) {
    console.log('le fichier '+ event.path +' a été modifié')
  });
  gulp.watch('app/*.html').on('change', browserSync.reload).on('change', function(event) {
    console.log('le fichier '+ event.path +' a été modifié');
  });
  gulp.watch('app/js/**/*.js').on('change', browserSync.reload).on('change', function(event) {
    console.log('le fichier '+ event.path +' a été modifié');
  });
})
