module.exports = (options = {}) => {
    const pxReg = /(\d+)px/gi;

    return {
        postcssPlugin: 'postcss-simple-px2rem',
        prepare(result) {
            return {
                Declaration(decl) {
                    decl.value = decl.value.replace(pxReg, (matchStr, num) => {
                        return `${num / options.base}rem`;
                    });
                }
                // Rule(node) {},
                // AtRule(node) {}
            };
        }
    };
};
