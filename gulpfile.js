const gulp = require('gulp');
const nodemon = require('nodemon');
const plumber = require('gulp-plumber');
const tinyLr = require('tiny-lr');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');
const { finished } = require('stream/promises');

const repoRoot = path.join(__dirname, '/');
const nodeModulesRoot = path.join(repoRoot, 'node_modules');
const govUkFrontendRoot = './node_modules/govuk-frontend/dist/govuk';

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
      nodeModulesRoot
    ],
    quietDeps: true,
    silenceDeprecations: ['import', 'global-builtin', 'mixed-decls']
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
      `${govUkFrontendRoot}/govuk-frontend.min.js`
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
      `${govUkFrontendRoot}/assets/images/**/*`
    ], { encoding: false })
    .pipe(gulp.dest(`${assetsDirectory}/img/lib/`)),

    gulp.src([
      `${govUkFrontendRoot}/assets/fonts/**/*`
    ], { encoding: false })
    .pipe(gulp.dest(`${assetsDirectory}/fonts/`))
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
