/**
 *
 * @format
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const ErrorsOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 显示编译时间
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const typescriptFormatter = require('./typescriptFormatter');

// 判断环境
const isDev = process.env.NODE_ENV === 'development';
const config = require('./config');

// 检查有没有ts文件
const useTypeScript = fs.existsSync(config.tsConfig);

const cssReg = /\.css$/;
const cssModuleReg = /\.module\.css$/;
const sassModuleReg = /\.module\.(scss|sass)$/;
const sassReg = /\.scss|.sass$/;
const lessModuleReg = /\.module\.less/;
const lessReg = /\.less$/;

const styleLoader = (options = {}) => {
    const styleInner = isDev
        ? {
              loader: 'style-loader',
              options: {
                  insert: 'head'
              }
          }
        : {
              loader: MiniCssExtractPlugin.loader,
              // 如果提取到单独文件夹下，记得配置一下publicPath，为了正确的照片css中使用的图片资源
              // 个人习惯将css文件放在单独目录下
              options: {
                  publicPath: '../../'
              }
          };

    return [
        styleInner,
        // antd的less主题更改用cache-loader总有问题
        // 'cache-loader',
        {
            loader: 'css-loader',
            options
        },
        {
            loader: 'postcss-loader'
        }
    ].filter(Boolean);
};

const sassLoader = () => {
    return [
        'sass-loader'
        // {
        //     loader: 'sass-resources-loader',
        //     options: {
        //         resources: `${config.appSrc}/common/assets/styles/variable.scss`
        //     }
        // }
    ].filter(Boolean);
};

const lessLoader = (options = {}) => {
    return [
        {
            loader: 'less-loader',
            options
        }
        // {
        //     loader: 'sass-resources-loader',
        //     options: {
        //         resources: `${config.appSrc}/common/assets/styles/variable.less`
        //     }
        // }
    ].filter(Boolean);
};

const commonConfig = {
    entry: {
        app: config.appIndexJs
    },

    performance: {
        hints: false
    },

    bail: isDev,

    target: 'web',

    cache: {
        type: 'filesystem'
    },

    optimization: {
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        minimize: false,
        chunkIds: isDev ? 'named' : 'deterministic',
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     process: 'process/browser'
        // }),

        // 只加载 `moment/locale/ja.js` 和 `moment/locale/it.js` 优化moment体积
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new HtmlWebpackPlugin({
            title: '',
            filename: 'index.html',
            template: config.appHtml,
            favicon: config.favicon,
            inject: true,
            // cache: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true, // 折叠空行
                removeAttributeQuotes: true, // 删除双引号
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunksSortMode: 'auto'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

        // 显示打包时间
        new ProgressBarPlugin({
            format: `${chalk.green('Progressing')} [:bar] ${chalk.green.bold(
                ':percent'
            )} (:elapsed seconds)`
        }),

        new ForkTsCheckerWebpackPlugin({
            // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
            async: false,
            typescript: { memoryLimit: 4096 }
            // formatter: typescriptFormatter
        }),

        // 将TypeScript类型检查错误以弹框提示
        // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
        // 否则建议使用，以方便发现错误
        new ForkTsCheckerNotifierWebpackPlugin({
            title: 'TypeScript',
            excludeWarnings: true,
            skipSuccessful: true
        }),

        new FriendlyErrorsWebpackPlugin(),

        new ESLintPlugin({
            context: path.resolve(__dirname, '../'),
            emitError: !isDev,
            emitWarning: !isDev,
            failOnError: !isDev,
            extensions: ['ts', 'tsx', 'js', 'jsx'],
            threads: true,
            exclude: 'node_modules',
            fix: false // 是否自动修复
        }),

        process.env.Analyzer && // 分析包的大小的
            new BundleAnalyzerPlugin({
                // concatenateModules: false,
                //  可以是`server`，`static`或`disabled`。
                //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
                //  在“静态”模式下，会生成带有报告的单个HTML文件。
                //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 1331,
                //  路径捆绑，将在`static`模式下生成的报告文件。
                //  相对于捆绑输出目录。
                // reportFilename: 'report.html',
                //  模块大小默认显示在报告中。
                //  应该是`stat`，`parsed`或者`gzip`中的一个。
                //  有关更多信息，请参见“定义”一节。
                defaultSizes: 'parsed',
                //  在默认浏览器中自动打开报告
                openAnalyzer: true,
                //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
                generateStatsFile: false,
                //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
                //  相对于捆绑输出目录。
                statsFilename: 'stats.json',
                //  stats.toJson（）方法的选项。
                //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
                //  在这里查看更多选项：https：//github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
                statsOptions: null,
                logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
            })

        // new HtmlWebpackTagsPlugin({
        //     tags: [
        //         isDev ? './public/js/baiduMap.js' : 'public/js/baiduMap.js',
        //         {
        //             path:
        //                 'http://api.map.baidu.com/api?v=3.0&ak=moMIflSL2yGiq3VwQ3bynEKE7gl2cjQw',
        //             type: 'js'
        //         },
        //     ],
        //     append: false
        // })
    ].filter(Boolean),

    resolve: {
        extensions: ['tsx', 'ts', 'jsx', 'js', 'json']
            .map(ext => `.${ext}`)
            .filter(ext => useTypeScript || !ext.includes('ts')),

        // 目录开头为 @ 符号，文件开头为 $ 符号
        plugins: [
            // 将 tsconfig.json 中的路径配置映射到 webpack 中
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            })
        ]

        // fallback: { path: require.resolve('path-browserify') }
    },

    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                exclude: /node_modules/,
                include: config.appSrc
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: false,
                            icon: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'app/images/[name]_[hash:7].[ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 1000 * 1024 // 4kb
                    }
                }
                // use: [
                // {
                //     loader: 'image-webpack-loader',
                //     options: {
                //         mozjpeg: {
                //             progressive: true,
                //             quality: 65
                //         },
                //         optipng: {
                //             enabled: true
                //         },
                //         pngquant: {
                //             quality: [0.65, 0.9],
                //             speed: 4
                //         },
                //         gifsicle: {
                //             interlaced: false
                //         },
                //         webp: {
                //             quality: 75
                //         }
                //     }
                // },
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             esModule: false,
                //             limit: 0,
                //             name: 'app/images/[name]_[hash:7].[ext]'
                //         }
                //     }
                // ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'app/files/[name]_[hash:7].[ext]'
                }
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             esModule: false,
                //             name: 'app/files/[name]_[hash:7].[ext]'
                //         }
                //     }
                // ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'app/fonts/[name]_[hash:7].[ext]'
                }
                // use: {
                //     loader: 'file-loader',
                //     options: {
                //         limit: 15000,
                //         esModule: false,
                //         name: 'app/fonts/[name]_[hash:7].[ext]'
                //     }
                // }
            },
            // 找到第一个匹配的进行解析  设置module与非module形式都支持，根据文件名称区分，文件写了[name].module.scss或者[name].module.less即支持module
            {
                oneOf: [
                    // {
                    //     // sassmodule
                    //     test: sassModuleReg,
                    //     use: [
                    //         ...styleLoader({
                    //             modules: {
                    //                 localIdentName: '[local]--[hash:base64:5]'
                    //             }
                    //         }),
                    //         ...sassLoader()
                    //     ],
                    //     include: config.appSrc
                    // },
                    // {
                    //     test: lessModuleReg,
                    //     use: [
                    //         ...styleLoader({
                    //             modules: {
                    //                 localIdentName: '[local]--[hash:base64:5]'
                    //             }
                    //         }),
                    //         ...lessLoader({
                    //             lessOptions: {
                    //                 javascriptEnabled: true
                    //             }
                    //         })
                    //     ],
                    //     include: config.appSrc
                    // },
                    {
                        // sass
                        test: sassReg,
                        resourceQuery: /css_modules/,
                        use: [
                            ...styleLoader({
                                importLoaders: 2,
                                modules: {
                                    localIdentName: '[local]--[hash:base64:5]'
                                }
                            }),
                            ...sassLoader()
                        ],
                        include: config.appSrc
                    },
                    {
                        // sass
                        test: sassReg,
                        use: [...styleLoader(), ...sassLoader()],
                        include: config.appSrc
                    },
                    {
                        // less
                        test: lessReg,
                        resourceQuery: /css_modules/,
                        use: [
                            ...styleLoader({
                                importLoaders: 2,
                                modules: {
                                    localIdentName: '[local]--[hash:base64:5]'
                                }
                            }),
                            ...lessLoader({
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            })
                        ],
                        include: config.appSrc
                    },
                    {
                        // less
                        test: lessReg,
                        use: [
                            ...styleLoader(),
                            ...lessLoader({
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            })
                        ],
                        include: config.appSrc
                    },

                    // {
                    //     // cssmodule
                    //     test: cssModuleReg,
                    // use: [
                    //     ...styleLoader({
                    //         modules: {
                    //             localIdentName: '[local]--[hash:base64:5]'
                    //         }
                    //     })
                    // ],
                    //     include: config.appSrc
                    // },
                    {
                        // css
                        test: cssReg,
                        resourceQuery: /css_modules/,
                        use: [
                            ...styleLoader({
                                importLoaders: 2,
                                modules: {
                                    localIdentName: '[local]--[hash:base64:5]'
                                }
                            })
                        ]
                        // include: config.appSrc
                    },
                    {
                        // css
                        test: cssReg,
                        use: [...styleLoader()]
                        // include: config.appSrc
                    },
                    {
                        // antd等第三方less
                        test: lessReg,
                        use: [
                            ...styleLoader(),
                            ...lessLoader({
                                lessOptions: {
                                    // 使用less默认运行时替换配置的@color样式
                                    modifyVars: config.styles,
                                    javascriptEnabled: true
                                }
                            })
                        ],
                        include: /node_modules/
                    }
                ]
            }
        ]
    }
};

module.exports = smp.wrap(commonConfig);
// module.exports = commonConfig;
