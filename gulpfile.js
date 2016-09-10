const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');

function handleErrors(){
  notify.onError({
    title: "compile error",
    message: "<%= error.message %>"
  }).apply(this, arguments);
  this.emit('end');
}

gulp.task('build-client', () =>{
  const bundler = watchify(browserify({
    entries: ["./client/app.jsx", "./client/canvas.js"],
    debug: true,
    transform: [['babelify', {presets: ['es2015','react']}]]
  }))

  function rebundle(){
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./client/build/'));
  }

  bundler.on('update', () => {
    rebundle();
    console.log('updated');
  })

  return rebundle();

})

gulp.task('default', ['build-client']);
