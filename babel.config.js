/** @format */

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                debug: false,
                targets: {
                    node: 'current',
                    browsers: ['> 8%', 'last 2 versions', 'not ie <= 8']
                },
                modules: false
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        './babel-plugin-translate-plugin.js',
        './babel-plugin-css-modules.js',
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3,
                proposals: true,
                helpers: true
            }
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
            }
        ],
        process.env.NODE_ENV === 'development' &&
            require.resolve('react-refresh/babel')
    ].filter(Boolean),

    // 当前环境将使用 process.env.BABEL_ENV 。当 BABEL_ENV 不可用时，它将回退到 NODE_ENV ，如果不可用，则默认为“ development ”。
    // env: {
    //     development: {
    //         plugins: [
    //             [
    //                 '@babel/plugin-transform-runtime',
    //                 {
    //                     corejs: 3,
    //                     helpers: true
    //                 }
    //             ]
    //         ]
    //     },
    //     production: {
    //         plugins: ['@babel/runtime']
    //     }
    // },
    sourceMaps: true
};
