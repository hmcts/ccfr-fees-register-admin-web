const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');
const replace = require('gulp-replace');

const repoRoot = path.join(__dirname, '/');
const govUkFrontendToolkitRoot = path.join(repoRoot, 'node_modules/govuk_frontend_toolkit/stylesheets');
const govUkElementRoot = path.join(repoRoot, 'node_modules/govuk-elements-sass/public/sass');

const assetsDirectory = './src/main/public';
const stylesheetsDirectory = `${assetsDirectory}/stylesheets`;

gulp.task('sass', function() {
  return gulp.src(stylesheetsDirectory + '/*.scss')
  .pipe(sass({
    includePaths: [
      govUkFrontendToolkitRoot,
      govUkElementRoot
    ]
  }))
  .pipe(plumber())
  .pipe(gulp.dest(stylesheetsDirectory))
  .pipe(livereload());

})

gulp.task("copy-files", function(done) {
  gulp.src([
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/govuk_frontend_toolkit/javascripts/**/*.js',
  './node_modules/govuk_template_jinja/assets/javascripts/**/*.js'
])
  .pipe(gulp.dest(`${assetsDirectory}/js/lib/`));

gulp.src([
  './node_modules/HTML_CodeSniffer/HTMLCS.js'
])
  .pipe(gulp.dest(`${assetsDirectory}/js/lib/htmlcs`));

gulp.src([
  './node_modules/HTML_CodeSniffer/Standards/**'
])
  .pipe(gulp.dest(`${assetsDirectory}/js/lib/htmlcs/Standards`));

gulp.src([
  './node_modules/HTML_CodeSniffer/Auditor/HTMLCSAuditor.js'
])
  .pipe(gulp.dest(`${assetsDirectory}/js/lib/htmlcs/Auditor`));

gulp.src([
  './node_modules/HTML_CodeSniffer/Auditor/**/*.{css,gif,png}'
])
  .pipe(gulp.dest(`${assetsDirectory}/stylesheets/lib/`));

gulp.src([
  './node_modules/govuk_frontend_toolkit/images/**/*',
  './node_modules/govuk_template_jinja/assets/images/*.*'
])
  .pipe(gulp.dest(`${assetsDirectory}/img/lib/`));

gulp.src([
  './node_modules/govuk_template_jinja/assets/stylesheets/**/*'
])
  .pipe(replace('images/', '/stylesheets/lib/images/', {skipBinary: true}))
  .pipe(gulp.dest(`${assetsDirectory}/stylesheets/lib/`));

  done();

})

gulp.task("watch", function() {
  return gulp.watch(stylesheetsDirectory + '/**/*.scss', ['sass'])
});

gulp.task('develop', function() {
  setTimeout( function() {
  livereload.listen()
  nodemon({
    ext: 'ts js njk po',
    stdout: true
  }).on('readable', function() {
    this.stdout.on('data', function (chunk) {
    if (/^Application started on port/.test(chunk)) {
      livereload.changed(__dirname)
    }
  })
  this.stdout.pipe(process.stdout);
  this.stderr.pipe(process.stderr);
})
}
,
500
)
})

gulp.task('default', gulp.series('sass',
  'copy-files',
  'develop',
  'watch'
));
