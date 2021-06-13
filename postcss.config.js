/** @format */
const postcssCustompProperties = require('postcss-custom-properties');

module.exports = {
    plugins: [
        postcssCustompProperties({
            importFrom: 'src/common/assets/styles/variable.scss',
            preserve: true
        }),

        require('postcss-preset-env')(),

        require('autoprefixer')({
            overrideBrowserslist: [
                '> 1%',
                'last 3 versions',
                'iOS >= 8',
                'Android >= 4',
                'Chrome >= 40'
            ]
        })

        // require('postcss-pxtorem')({
        //     rootValue: 32, // 指定转换倍率，我现在设置这个表示1rem=37.5px;
        //     propList: ['*', '!font-size'], // 属性列表，表示你要把哪些css属性的px转换成rem，*表示所有
        //     minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
        //     unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
        //     selectorBlackList: ['van-circle__layer', 'ignore'],
        //     exclude: /node_modules/i,
        //     mediaQuery: false // 允许在媒体查询中转换px
        // })

        // require('postcss-px-to-viewport')({
        //     exclude: /node_modules/i,
        //     viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 （如果我们设置的宽度是300px，那么编译之后的宽度为(300/750*100)=40vw,如果频宽实际为375px，那么该元素的宽度为（375*0.4）= 150px）
        //     viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        //     unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
        //     viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        //     selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        //     minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        //     mediaQuery: false // 允许在媒体查询中转换`px`
        // })
    ]
};
