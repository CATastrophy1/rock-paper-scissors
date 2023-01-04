const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const kit = require('gulp-kit');
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create();
const reload = browserSync.reload


const paths = {
    sass:'./src/sass/**/*.scss',
    html:'./html/**/*.kit',
    sassDest:'./dist/css',
    js: './src/js/**/*.js',
    jsDest: './dist/js',
    img:'./src/img/*',
    imgDest: './dist/img'

}

function buildStyles(done) {
	src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe (autoprefixer())
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest))
    done()
}

function javaScript (done) {
    src(paths.js)
    .pipe(sourcemaps.init()).pipe(babel({
        presets: ['@babel/env']
    })).pipe(uglify())
    .pipe(rename({suffix:'.min'})).pipe(sourcemaps.write())
    .pipe(dest(paths.jsDest))
  done()
}

function compressImage(done) {
    src(paths.img)
    .pipe(imagemin())
    .pipe(dest(paths.imgDest))
    done()
}

const startBrowserSync = (done) => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done()
}
const cleanStuff = (done) => {
    src('./dist', {read: false})
    .pipe(clean())
    done()
}
const handleKit = (done) => {
    src(paths.html)
    .pipe(kit())
    .pipe(dest('./'))
    done()
}
const watchForChanges = (done) => {
  watch('./*.html').on('change', reload)
  watch([paths.html, paths.sass, paths.js], parallel(handleKit, buildStyles, javaScript)).on("change", reload)
  watch(paths.img, compressImage).on("change", reload)

    done()
}



const mainFunctions = parallel(handleKit, buildStyles, javaScript, compressImage)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
