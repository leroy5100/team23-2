var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')

gulp.task('styles', function() {
  gulp.src('app/development/scss/main.scss')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
      .pipe(gulp.dest('./app/dist/css'))
      .pipe(reload({stream:true}))
});

gulp.task('browser-sync', function() {
    browserSync({
      proxy: 'localhost/team23-2'
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

function buildScript(file, watch) {
  var props = {
    entries: ['./app/development/js/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform: [babelify.configure({presets: ['es2015']})]
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./app/dist/js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest('./app/dist/js'))
      .pipe(reload({stream:true}))
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  return rebundle();
}

/*
  1. Dit is een task, die alle plugins samenvoegt
  2. De src is een array met bestanden, omdat de plugins op verschillende plekken kunnen staan
*/

// gulp.task('jsplugins', function(){
//     gulp.src([
//       './app/development/bower_components/jquery/dist/jquery.js'
//       ])
//       .pipe( concat('plugins.min.js') )
//       //.pipe( uglify() )
//       .pipe( gulp.dest('./app/dist/js') )
//       .pipe(reload({stream:true}))
// });

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('default', ['styles','scripts','browser-sync'], function() {
  gulp.watch('app/development/scss/**/*', ['styles']);
  return buildScript('main.js', true);
});
