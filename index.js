/* eslint-disable import/no-extraneous-dependencies */
const { transformFromAstSync } = require('@babel/core');
const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');
const types = require('@babel/types');
const generator = require('@babel/generator').default;
const translatePlugin = require('./babel-plugin-translate-plugin');

// console.log(types.stringLiteral("Hello World")) // string
// console.log(types.numericLiteral(100)) // string
// console.log(generator(types.stringLiteral("Hello World")).code);
// console.log(generator(types.numericLiteral(100)).code);
// console.log(generator(types.arrayExpression([
//   types.stringLiteral("Hello World"),
//   types.numericLiteral(100),
//   types.booleanLiteral(true),
//   types.regExpLiteral("\\.js?$", "g"),
// ])).code);

// console.log(types.arrayExpression([
//   types.stringLiteral("Hello World"),
//   types.numericLiteral(100),
//   types.booleanLiteral(true),
//   types.regExpLiteral("\\.js?$", "g"),
// ]))

// console.log(types.jsxElement(
//   types.jsxOpeningElement(types.jsxIdentifier("Button"), []),
//   types.jsxClosingElement(types.jsxIdentifier("Button")),
//   [types.jsxExpressionContainer(types.identifier("props.name"))]
// ))

// console.log(generator(types.jsxElement(
//   types.jsxOpeningElement(types.jsxIdentifier("Button"), []),
//   types.jsxClosingElement(types.jsxIdentifier("Button")),
//   [types.jsxExpressionContainer(types.identifier("props.name"))]
// )).code)

const sourceCode = fs.readFileSync(path.resolve(__dirname, './src/index.tsx'), {
    encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx']
});

const { code } = transformFromAstSync(ast, sourceCode, {
    babelrc: false,
    configFile: false,
    presets: [],
    plugins: [
        [
            translatePlugin,
            {
                trackerPath: 'tracker'
            }
        ]
    ]
});

fs.writeFileSync(path.resolve(__dirname, './result/index.tsx'), code);
