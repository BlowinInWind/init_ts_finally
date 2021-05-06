/** @format */

const path = require('path');
const fs = require('fs');
const os = require('os');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const colors = require('./styles');

const baseUrl = 'http://test.gateway.heimaqf.cn';

module.exports = {
    // 根的js
    appIndexJs: resolveApp('src/index.tsx'),
    // 根html
    appHtml: resolveApp('public/index.html'),
    // 打包文件夹
    appbuild: resolveApp('dist'),
    // 项目主目录
    appSrc: resolveApp('src'),
    // 静态文件比如百度地图js，d3等
    appPublic: resolveApp('public'),
    appPulicPath: resolveApp('/'),
    // favicon 路径
    favicon: resolveApp('public/ico.ico'),
    // 默认开启的本地项目端口号
    port: '3000',
    // 手动配置打开的host
    host: '0.0.0.0',

    // 需要代理
    proxy: {
        '/dev-api': {
            target: baseUrl,
            changeOrigin: true,
            pathRewrite: { '^/dev-api': '/' }
        }
    },

    baseUrl: baseUrl,
    //node_modules
    appNodeModules: resolveApp('node_modules'),
    tsConfig: resolveApp('tsconfig.json'),
    // 配色方案，可以根据assets找那个的variable进行配色的替换
    styles: colors.styles
};
