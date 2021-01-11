let gulp = require('gulp')
let gulpConnect = require('gulp-connect')

let image = require('gulp-image');
let sass = require('gulp-sass');
let gulpClean = require('gulp-clean');
// let gulpMinifyCss = require('gulp-minify-css');
let gulpConcat = require('gulp-concat');
let gulpUglify = require('gulp-uglify');
let gulpHtmlmin = require('gulp-htmlmin');

gulp.task('server',async function(){
	gulpConnect.server({
	  root : "dist",
	  livereload : true
	})
})
// task untuk minify
gulp.task('image', async function () {
  gulp.src('./assets/images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/image'));
});
gulp.task('minify-sass', async function () {
  gulp.src('./sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(gulpConnect.reload());
});
// gulp.task('minify-css', async function () {
//   gulp.src('./assets/css/*.css')
//   .pipe(gulpMinifyCss({
//       compatibility: 'ie8'
//   }))
//   .pipe(gulp.dest('dist'))
//   .pipe(gulpConnect.reload())
// });

gulp.task('minify-js', async function () {
	gulp
			.src([
					'./assets/js/*.js'
			])
			.pipe(gulpConcat('main.js'))
			.pipe(gulpUglify())
			.pipe(gulp.dest('dist'))
			.pipe(gulpConnect.reload())
});

gulp.task('minify-html', async function () {
	gulp.src('./*.html')
			.pipe(gulpHtmlmin({
					collapseWhitespace: true
			}))
			.pipe(gulp.dest('dist'))
			.pipe(gulpConnect.reload())
});
gulp.task('watch', async function () {
  gulp.watch('sass/**/*.scss', (done) => {
    gulp.series(['minify-sass'])(done);
  });
	gulp.watch('./assets/js/*.js', gulp.series('minify-js'));
	gulp.watch('./assets/images/*.*', gulp.series('image'));
	// gulp.watch('./assets/css/*.css', gulp.series('minify-css'));
	gulp.watch('./*.html', gulp.series('minify-html'));
});

gulp.task('default', gulp.series('watch','server'))
gulp.task('clean', function() {
  return gulp.src('dist', {
    read: false,
    allowEmpty: true
  }).pipe(gulpClean());
});

gulp.task('build', gulp.series('clean', 'minify-sass', 'minify-js', 'minify-html'));
