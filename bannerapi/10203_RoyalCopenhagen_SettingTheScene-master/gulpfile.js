const gulp = require('gulp');
const flatmap = require('gulp-flatmap');
const zip = require('gulp-zip');
const tinypng = require('gulp-tinypng-compress');
const uglify = require('gulp-uglify');
const pump = require('pump');
const htmlmin = require('gulp-htmlmin');
const minifyInline = require('gulp-minify-inline');
const webshot = require('gulp-webshot');
const glob = require('glob');
const path = require('path');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const del = require('del');
const runSequence = require('run-sequence');
const exec = require('child_process').exec;
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
//the flow is : 'copy','minifyjs','minifyhtml','shot','tinypng-banners','rename-fallbacks','tinypng-fallbacks','delete-fallbacks','zip-banners','zip-campaign'



// create a zip flatmap banner format
gulp.task('zip-banners', function() {
    return gulp.src("./dist/*")
        .pipe(flatmap(function(stream, file) {
            const folderName = file.path.substr(file.path.lastIndexOf("/") + 1);
            gulp.src(file.path + "/**/*")
                .pipe(zip(folderName + ".zip"))
                .pipe(gulp.dest("./dist"));
            return stream;
        }));
});


// create a campaign zip with all other format zips
gulp.task('zip-campaign', function() {
    return gulp.src('./dist/*.zip')
        .pipe(zip('campaign.zip'))
        .pipe(gulp.dest('./dist'));
});

//tinypng all the images inside banners
gulp.task('tinypng-banners', function() {
    return gulp.src('dist/**/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'DxmgS5gokuvnyQipy0P25MqJGQwOqGG9',
            sigFile: '.tinypng-sigs',
            parallel: true,
            sameDest: true,
            log: true,
            summarise: true
        }))
        .pipe(gulp.dest('dist'));
});
//compress images
gulp.task('tinypng-fallbacks', function() {
    return gulp.src('dist/fallbacks/*.png')
        .pipe(tinypng({
            key: '7P99tT3RxJ69AnxJ2GGREH39SJMD40QJ',
            sigFile: '.tinypng-sigs',
            parallel: true,
            sameDest: true,
            log: true,
            summarise: true
        }))
        .pipe(gulp.dest('dist/fallbacks'));
});

//copy all files to dist
gulp.task('copy', function() {
    return gulp.src(['./Banners/**/*'])
        .pipe(gulp.dest('dist'))
});

//autoprefixer
gulp.task('autoprefix', function() {
    return gulp.src('dist/**/*.css')
        .pipe(autoprefixer( {
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
 });



//minify js
gulp.task('minifyjs', function() {
    return pump([
            gulp.src('dist/**/*.js'),
            uglify(),
            gulp.dest('dist')
        ]
    )
});


//minify html
gulp.task('minifyhtml', function() {
    return gulp.src('dist/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(minifyInline())
        .pipe(gulp.dest('dist'));
});



//take screenshots of the banners(fallbacks)
gulp.task('shot', function() {
    return gulp.src("./dist/**/index.html")
        .pipe(flatmap(function(stream, file) {
            const folderName = file.path.substr(0, file.path.lastIndexOf(path.sep));
            const sources = require(folderName + "/manifest.json");

            return stream.pipe(webshot({
                dest: 'dist/',
                root: 'dist',
                shotSize: {
                    width: sources.width,
                    height: sources.height
                },
                renderDelay: 30000
            }));

        }));
});


//rename and copy fallbacks from banner folder to a separate fallbacks folder
gulp.task('rename-fallbacks', function() {
    return gulp.src('./dist/**/index.png')
        .pipe(flatmap(function(stream, file) {
            const folderName = file.path.substr(0, file.path.lastIndexOf(path.sep));
            const sources = require(folderName + "/manifest.json");

            return stream.pipe(rename("fallback" + sources.width + 'x' + sources.height + '.png'))
                .pipe(gulp.dest("./dist/fallbacks"));
        }));
});

//delete fallbacks from banner folder 
gulp.task('delete-fallbacks', function() {
    return del([
        'dist/**/index.png'
    ]);
});

//delete sass files from banner folder 
gulp.task('delete-sass', function() {
    return del([
        'dist/**/*.scss'
    ]);
});

// gulp.task('callback', function () {
//     // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
//     return watch('./Banners/**/*.scss', function () {
//         gulp.src('./Banners/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('dist'));
//     });
// });

gulp.task('watch', function() {
    gulp.src(['./Banners/**/*'])
    .pipe(gulp.dest('dist'))
    gulp.watch('./Banners/**/*.scss', gulp.series('sass'));
});

 // compile sass
 gulp.task('sass', function () {
        gulp.src('./Banners/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist'));
  });
 

//default gulp tasks to be run
// gulp.task('default', gulp.series('copy','minifyjs','minifyhtml','tinypng-banners','zip-banners','zip-campaign'));
gulp.task('default', gulp.series('copy','minifyjs','minifyhtml', 'autoprefix','tinypng-banners','tinypng-fallbacks','rename-fallbacks','delete-fallbacks', 'delete-sass', 'zip-banners','zip-campaign'));

// gulp.task('default', function(){
//   return runSequence(
//     'copy','minifyjs','minifyhtml','shot','tinypng-banners','tinypng-fallbacks','rename-fallbacks','delete-fallbacks','zip-banners','zip-campaign'
//   );
// });

