/**
 *
 * @format
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./config');
const commonConfig = require('./webpack.config.common.js');

const publicConfig = {
    output: {
        path: config.appbuild,
        filename: 'app/js/[name].[contenthash:8].js',
        chunkFilename: 'app/js/[name].[contenthash:8].chunk.js',
        publicPath: '/'
        // library: 'result', // 函数或变量名字
        // libraryTarget: 'umd' //打包文件加载方式
    },

    devtool: false,
    // devtool: 'cheap-module-source-map',

    optimization: {
        usedExports: true,
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        minimize: false,
        chunkIds: 'deterministic',
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

    mode: 'production',

    plugins: [
        new TerserPlugin({
            exclude: /node_modules/,
            extractComments: false,
            parallel: true // 并行压缩
        }),

        // brotli-webpack-plugin br压缩方式 待实践
        // new BrotliPlugin({
        // 	asset: '[path].br[query]',
        // 	test: /\.(js|css|html|svg)$/,
        // 	threshold: 10240,
        // 	minRatio: 0.8
        // })

        new CompressionWebpackPlugin({
            filename: '/app/js/[name].gz[query]',
            // 压缩后缀
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            // 只处理比这个值大的资源。按字节计算
            threshold: 10240,
            // 只有压缩率比这个值小的资源才会被处理 （minRatio = 压缩大小 / 原始大小）
            minRatio: 0.8,
            exclude: /node_modules/,
            // 是否删除原资源
            deleteOriginalAssets: false
        }),

        new CleanWebpackPlugin(),

        //  copy 在dev模式下不好使
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(config.appPublic, 'js'),
        //         to: path.resolve(config.appbuild, 'public/js')
        //     }]
        // ),

        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
        // 这样可以确保输出资源不会包含错误
        new webpack.NoEmitOnErrorsPlugin(),

        // 配和MiniCssExtractPlugin.loader, 提取css到特定的目录下
        new MiniCssExtractPlugin({
            filename: 'app/css/[name].[contenthash:8].css',
            chunkFilename: 'app/css/[name].[contenthash:8].css',
            ignoreOrder: true
        }),

        new CssMinimizerWebpackPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true }
                    }
                ]
            },
            parallel: true,
            exclude: /node_modules/
        })
    ]
};

module.exports = merge(commonConfig, publicConfig);
