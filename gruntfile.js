//wrapper函数
module.exports = function(grunt) {

    //你可以像普通的js文件一样添加自己的代码
    var sassStyle = 'expanded';

    //1.配置任务 tasks--根据插件的文档来定义任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //将html和图片从src复制到build
        copy: { //task
            html: { //target
                files: [
                    { expand: true, cwd: './src/html', src: '*', dest: './build/html/' }
                ]
            },
            images: { //target
                files: [
                    { expand: true, cwd: './src/images', src: '*', dest: './build/images/' }
                ]
            }
        },
        //合并js
        concat: {
            /* options: {
                separator: ';',//合并分隔符
            }, */
            dist: {
                files: { //文件路径
                    './src/js/a.all.js': ['./src/js/a.1.js', './src/js/a.2.js'],
                    './src/js/b.all.js': ['./src/js/b.1.js', './src/js/b.2.js']
                }
            },
        },
        //task:编译sass
        sass: {
            output: { //target
                options: { //target options
                    style: sassStyle
                },
                files: {
                    './build/css/style.css': './src/scss/style.scss' //'目标文件':'源文件'
                }
            }
        },
        //代码检查
        jshint: {
            all: ['./src/js/a.all.js', './src/js/b.all.js']
        },
        //压缩
        uglify: {
            uglifyjs: {
                files: {
                    './build/js/a.min.js': ['./src/js/a.all.js'],
                    './build/js/b.min.js': ['./src/js/b.all.js']
                }
            }
        },
        //监听
        watch: {
            scripts: {
                files: ['./src/js/a.1.js', './src/js/a.2.js', './src/js/b.1.js', '/src/js/b.2.js'],
                tasks: ['concat', 'jshint', 'uglify']
            },
            sass: {
                files: ['./src/scss/style.scss'],
                tasks: ['sass']
            },
            livereload: {
                options: {
                    liverelload: '<%= connect.options.livereload %>'
                },
                files: [
                    './src/html/index.html',
                    './src/scss/style.scss',
                    './src/js/a.1.js',
                    './src/js/a.2.js',
                    './src/js/b.1.js',
                    './src/js/b.2.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livareload: 35729,
                //change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        }
    });

    //2.加载插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //3.注册任务
    grunt.registerTask('copyhtml', ['copy:html']); //可以用task：target的方法分别注册
    grunt.registerTask('concatjs', ['concat']); //也可以只用task名称注册，默认执行task下全部target
    grunt.registerTask('outputcss', ['sass']);
    grunt.registerTask('watchit', ['concat', 'sass', 'jshint', 'uglify', 'connect', 'watch']);
    grunt.registerTask('default', ['copy', 'concat', 'sass', 'jshint', 'uglify']);
}