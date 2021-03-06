/** @format */
const { merge } = require('webpack-merge');
const chalk = require('chalk');
const fs = require('fs');
const webpack = require('webpack');
const portfinder = require('portfinder');
const config = require('./config');
const commonConfig = require('./webpack.config.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const getLocalHostnameAndIp = require('./getLocalIp');

const devConfig = merge(
    {
        // devtool: 'cheap-module-source-map',
        devtool: 'eval-cheap-module-source-map',
        mode: 'development',

        output: {
            path: config.appbuild,
            filename: 'app/[name].bundle.js',
            chunkFilename: 'app/[name].chunk.js',
            publicPath: '/'
        },

        plugins: [
            new ReactRefreshWebpackPlugin({
                overlay: false
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

        devServer: {
            host: config.host,
            port: config.port,
            historyApiFallback: true,
            // http2: true,
            // https: {
            //     key: fs.readFileSync(
            //         `${config.config}/local.jiangtong.tech-key.pem`
            //     ),
            //     cert: fs.readFileSync(`${config.config}/local.jiangtong.tech.pem`)
            // },
            compress: true,
            hot: true,
            // 默认浏览器
            open: true,
            liveReload: false,
            proxy: config.proxy,
            // 允许被主应用跨域fetch请求到
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    },
    commonConfig
);

// 自动寻找空余端口
module.exports = new Promise((resolve, reject) => {
    // 搜寻可用的端口号
    portfinder.basePort = config.port;
    portfinder.getPort((err, port) => {
        if (err) reject(err);
        else {
            devConfig.devServer.port = port;
            devConfig.plugins = [
                // 显示那个小文字
                function () {
                    this.hooks.done.tap('done', stats => {
                        if (
                            stats.compilation.errors &&
                            stats.compilation.errors.length &&
                            process.argv.indexOf('--watch') === -1
                        ) {
                            console.log(chalk.red.bold('build error'));
                            // process.exit(1);
                        } else {
                            console.log(chalk('   App running at:'));
                            console.log(
                                `   - Local:    ${chalk.cyan(
                                    `http://127.0.0.1:${chalk.cyan.bold(port)}`
                                )}`
                            );
                            console.log(
                                `   - Network:  ${chalk.cyan(
                                    `http://${getLocalHostnameAndIp()}:${chalk.cyan.bold(
                                        port
                                    )}`
                                )}`
                            );

                            console.log(chalk('\n'));

                            console.log(
                                chalk.red(
                                    '   如果需要提供一个与你处于同一局域网内的可访问地址，请使用Network'
                                )
                            );
                            console.log(chalk('\n\n'));
                            // process.exit(0);
                        }
                    });
                },
                ...devConfig.plugins
            ];
        }
        resolve(devConfig);
    });
});
