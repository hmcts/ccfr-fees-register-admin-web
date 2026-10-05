const gulp = require('gulp');
const nodemon = require('nodemon');
const plumber = require('gulp-plumber');
const tinyLr = require('tiny-lr');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');
const replace = require('gulp-replace');
const { finished } = require('stream/promises');

const repoRoot = path.join(__dirname, '/');
const govUkFrontendToolkitRoot = path.join(repoRoot, 'node_modules/govuk_frontend_toolkit/stylesheets');
const govUkElementRoot = path.join(repoRoot, 'node_modules/govuk-elements-sass/public/sass');

const assetsDirectory = './src/main/public';
const stylesheetsDirectory = `${assetsDirectory}/stylesheets`;
const livereloadPort = 35729;
const livereloadServer = tinyLr();
let livereloadListening = false;

function reload(filePath) {
  if (livereloadListening) {
    livereloadServer.changed({ body: { files: [filePath] } });
  }
}

gulp.task('sass', function() {
  return gulp.src(stylesheetsDirectory + '/*.scss')
  .pipe(plumber())
  .pipe(sass({
    includePaths: [
      govUkFrontendToolkitRoot,
      govUkElementRoot
    ]
  }))
  .pipe(gulp.dest(stylesheetsDirectory))
  .on('end', function() {
    reload(`${stylesheetsDirectory}/application.css`);
  });

})

gulp.task("copy-files", function() {
  const streams = [
    gulp.src([
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/govuk_frontend_toolkit/javascripts/**/*.js',
      './node_modules/govuk_template_jinja/assets/javascripts/**/*.js'
    ])
    .pipe(gulp.dest(`${assetsDirectory}/js/lib/`)),

    gulp.src([
      './node_modules/HTML_CodeSniffer/HTMLCS.js'
    ])
    .pipe(gulp.dest(`${assetsDirectory}/js/lib/htmlcs`)),

    gulp.src([
      './node_modules/HTML_CodeSniffer/Standards/**'
    ])
    .pipe(gulp.dest(`${assetsDirectory}/js/lib/htmlcs/Standards`)),

    gulp.src([
      './node_modules/HTML_CodeSniffer/Auditor/HTMLCSAuditor.js'
    ])
    .pipe(gulp.dest(`${assetsDirectory}/js/lib/htmlcs/Auditor`)),

    gulp.src([
      './node_modules/HTML_CodeSniffer/Auditor/**/*.{css,gif,png}'
    ], { encoding: false })
    .pipe(gulp.dest(`${assetsDirectory}/stylesheets/lib/`)),

    gulp.src([
      './node_modules/govuk_frontend_toolkit/images/**/*',
      './node_modules/govuk_template_jinja/assets/images/*.*'
    ], { encoding: false })
    .pipe(gulp.dest(`${assetsDirectory}/img/lib/`)),

    gulp.src([
      './node_modules/govuk-frontend/govuk/assets/fonts/**/*'
    ], { encoding: false })
    .pipe(gulp.dest(`${assetsDirectory}/fonts/`)),

    gulp.src([
      './node_modules/govuk_template_jinja/assets/stylesheets/**/*'
    ])
    .pipe(replace('images/', '/stylesheets/lib/images/', {skipBinary: true}))
    .pipe(gulp.dest(`${assetsDirectory}/stylesheets/lib/`))
  ];

  return Promise.all(streams.map(stream => finished(stream)));
})

gulp.task("watch", function() {
  return gulp.watch(stylesheetsDirectory + '/**/*.scss', gulp.series('sass'))
});

gulp.task('develop', function(done) {
  livereloadServer.listen(livereloadPort, function() {
    livereloadListening = true;
  });

  const monitor = nodemon({
    script: 'server.js',
    exec: 'node --inspect',
    watch: ['src/main', 'config', 'server.js'],
    ignore: ['src/main/public'],
    ext: 'ts js njk json po',
    stdout: false
  });

  monitor.on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Application started on port/.test(chunk)) {
        reload(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });

  done();
})

gulp.task('default', gulp.series(
  'sass',
  'copy-files',
  gulp.parallel('develop', 'watch')
));
