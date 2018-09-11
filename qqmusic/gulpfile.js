var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-debug'); //压缩后取消调试语句
var concat = require('gulp-concat'); //拼接js
var less = require('gulp-less');
var postcss = require('gulp-postcss'); //PostCSS gulp插件通过几个插件来管道CSS，但只解析CSS一次。
var autoprefixer = require('autoprefixer'); //自动添加前缀
var cssnano = require('cssnano'); //压缩css代码
var connect = require('gulp-connect');//开启本地服务器


var devMode = process.env.NODE_ENV == 'development'//用来判断是否是开发环境
//gulp.src()//读文件
//gulp.dest()//写文件
//gulp.task()//任务
//gulp.watch()//监听

var folder = {
    src: 'src/', //开发目录文件夹
    dist: 'dist/' //压缩打包后目录文件夹
}
//根据环境 判断是否进行压缩
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
    .pipe(connect.reload())
    if (!devMode) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'))

})

gulp.task('image', function () {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'))
})

gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
    .pipe(connect.reload())
    if (!devMode) {
        page.pipe(strip())
        page.pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'))
})

gulp.task('css', function () {
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())
        .pipe(connect.reload())
    if (!devMode) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.dist + 'css/'))

})

gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html'])
    gulp.watch(folder.src + 'css/*', ['css'])
    gulp.watch(folder.src + 'js/*', ['js'])
    gulp.watch(folder.src + 'image/*', ['image'])
})

gulp.task('server',function(){
    connect.server({
        port:'8090',
        livereload:true
    });
})

gulp.task('default', ['html', 'image', 'js', 'css', 'watch','server'])