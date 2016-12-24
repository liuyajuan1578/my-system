'use strict';

//init variable set
const gulp=require('gulp');
const $=require('gulp-load-plugins')();
const openURL = require('open');
const lazypipe = require('lazypipe');
const rimraf = require('rimraf');
const wiredep = require('wiredep').stream;
const runSequence=require('run-sequence');

const app={
  src:'app',
  dev:'dev',
  dist:'public'
};
let paths={
    scripts:[
        app.src+'/app.js',
        app.src+'/views*/**/*.js',
        app.src+'/components*/**/*.js'
    ],
    styles:[
        app.src+'/views*/**/*.less',
        app.src+'/components*/**/*.less',
        app.src+'/styles*/**/*.less'
    ],
    views:{
        main:app.src+'/index.html',
        files:[
            app.src+'/views*/**/*.html'
        ]
    },
    images: [
        app.src + '/images*/**/*'
    ],
    fonts: [
        app.src + '/fonts*/**/*',
        app.src + '/bower_components/bootstrap/fonts*/*',
        app.src + '/bower_components/font-awesome/fonts*/*'
    ]
};


//dev tasks
gulp.task('styles',function(){
    return gulp.src(paths.styles)
        .pipe($.less())
        .pipe($.autoprefixer('>1%'))
        .pipe(gulp.dest(app.dev));
});
gulp.task('scripts',function(){
   return gulp.src(paths.scripts)
       .pipe(gulp.dest(app.dev));
});
gulp.task('copy',function(){
    console.log(paths.views.files,paths.images,gulp.fonts);
    gulp.src(paths.views.files)
        .pipe(gulp.dest(app.dev));
    gulp.src(paths.images)
        .pipe(gulp.dest(app.dev));
    gulp.src(paths.fonts)
        .pipe(gulp.dest(app.dev));
});
gulp.task('inject', function () {
    var injectStyles = gulp.src([
        app.dev + '/**/*.css'
    ], {read: false});

    var injectScripts = gulp.src([
        app.dev + '/**/*.js',
        '!' + app.dev + '/**/*test.js'
    ]).pipe($.angularFilesort()
        .on('error', $.util.log));

    var injectOptions = {
        ignorePath: app.dev
    };

    var wiredepOptions = {
        optional: 'configuration',
        goes: 'here'
    };

    return gulp.src(paths.views.main)
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(app.dev));
});

//production tasks

gulp.task('copy:prod', function () {
    gulp.src(paths.views.files)
        .pipe(gulp.dest(app.dist));
    gulp.src(paths.views.login)
        .pipe(gulp.dest(app.dist));
    gulp.src(paths.images)
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(app.dist));
    gulp.src(paths.fonts)
        .pipe(gulp.dest(app.dist));
    gulp.src(paths.langs)
        .pipe(gulp.dest(app.dist+'/lang'));
});
gulp.task('replace:prod',function () {
    gulp.src(paths.pluginReplace.toastr.src)
        .pipe($.less())
        .pipe($.autoprefixer('>1%'))
        .pipe($.minifyCss({cache: true}))
        .pipe($.rename('toastr.min.css'))
        .pipe(gulp.dest(paths.pluginReplace.toastr.target));
    gulp.src(paths.pluginReplace.bootstrap.src[1])
        .pipe(gulp.dest(paths.pluginReplace.bootstrap.target))
});
gulp.task('minimize', function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    return gulp.src(app.dev + '/index.html')
        .pipe($.useref({searchPath: [app.dev, app.src]}))
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.minifyCss({cache: true}))
        .pipe(cssFilter.restore())
        // .pipe($.rev())
        // .pipe($.revReplace())
        .pipe(gulp.dest(app.dist));
});

gulp.task('watch', function () {
    $.watch(paths.styles)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer('>1%'))
        .pipe(gulp.dest(app.dev))
        .pipe(gulp.dest(app.dist)) //add
        .pipe($.connect.reload());

    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe(gulp.dest(app.dev))
        .pipe(gulp.dest(app.dist)) //add
        .pipe($.connect.reload());

    $.watch(paths.views.files)
        .pipe($.plumber())
        .pipe(gulp.dest(app.dev))
        .pipe(gulp.dest(app.dist)) //add
        .pipe($.connect.reload());

    gulp.watch(paths.views.main, ['inject']);
    gulp.watch('bower.json', ['inject']);

});

gulp.task('clean', function (cb) {
    rimraf(app.dev, cb);
});

gulp.task('clean:prod', function (cb) {
    rimraf(app.dist, cb);
});

//build

gulp.task('serve', function (cb) {
    runSequence(
        'build',
        'start:server',
        'start:client',
        'watch',
        cb);
});

gulp.task('serve:node',function(cb){
    runSequence(
        'build',
        'watch',
        cb);
});

gulp.task('serve:prod', function (cb) {
    runSequence(
        'build:prod',
        // 'start:server:prod',
        // 'start:client',

        cb);
});

gulp.task('build', function (cb) {
    runSequence(
        'clean',
        [
            'copy',
            'styles',
            'scripts',
        ],
        'inject',
        cb);
});

gulp.task('build:prod', function (cb) {
    runSequence(
        'build',
        'clean:prod',
        [
            'copy:prod',
            'minimize'
        ],
        'replace:prod',
        //'link:prod',
        cb);
});


gulp.task('default', ['serve:node']);
