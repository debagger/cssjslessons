const gulp = require("gulp");
const connect = require("gulp-connect");
const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const sourcemaps = require("gulp-sourcemaps");

function connectTask(cb) {
  connect.server({
    root: "./dist/",
    livereload: true
  });
  cb();
}

function htmlReload(cb) {
  gulp.src("./dist/**.html").pipe(connect.reload());
  cb();
}

function jsReload(cb) {
  gulp.src("./dist/js/**.js").pipe(connect.reload());
  cb();
}

function buildHtml(cb) {
  gulp.src("./src/**.html").pipe(gulp.dest("./dist"));
  cb();
}

function buildJs(cb) {
  gulp
    .src("./src/js/css.js")
    .pipe(sourcemaps.init())
    // transform the files here.
    .pipe(
      rollup(
        {
          // There is no `input` option as rollup integrates into the gulp pipeline
          plugins: [
            babel({
              babelrc: false,
              presets: [["@babel/env", { modules: false }]]
            })
          ]
        },
        {
          // Rollups `sourcemap` option is unsupported. Use `gulp-sourcemaps` plugin instead
          format: "cjs"
        }
      )
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/js"));
  cb();
}

function watchTask(cb) {
  gulp.watch("./src/**.html", gulp.series(buildHtml, htmlReload));
  gulp.watch("./src/js/**.js", gulp.series(buildJs, jsReload));
  cb();
}

exports.build = gulp.series(buildHtml, buildJs);
exports.default = gulp.series(connectTask, watchTask);
