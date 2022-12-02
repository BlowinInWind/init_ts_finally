/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
/* eslint-disable no-control-regex */
/* eslint-disable import/no-extraneous-dependencies */
const importModule = require('@babel/helper-module-imports');
const { declare } = require('@babel/helper-plugin-utils');
const generate = require('@babel/generator').default;

const md5 = require('md5');
// const chineseStringReg = /[\u4e00-\u9fa5]/;
const chineseStringReg = /[^\x00-\xff]/;

const translatePlugin = declare((api, options, dirname) => {
    api.assertVersion(7);

    function findParentLevel(path, callback, max = 2) {
        let count = 0;
        let myPath = path;
        while (count < max && (myPath = myPath.parentPath)) {
            count++;
            if (callback(myPath)) return myPath;
        }
        return null;
    }

    const getReplaceExpression = (path, value, intlUid, initValue) => {
        const expressionParams = path.isTemplateLiteral()
            ? path.node.expressions.map(item => {
                  const code = generate(item).code;
                  return generate(item).code;
              })
            : null;
        let replaceExpression = api.template.ast(
            `${intlUid}.t('${value}','${initValue.replace(/[\r\n]/g, '')}'${
                expressionParams ? `,${expressionParams.join(',')}` : ''
            })`
        ).expression;

        const parentType = path.parent;
        if (path.findParent(p => p.isJSXAttribute())) {
            if (
                !findParentLevel(path, p => p.isJSXExpressionContainer()) &&
                !findParentLevel(path, p => p.isLogicalExpression()) &&
                !findParentLevel(path, p => p.isExpression()) &&
                !findParentLevel(path, p => p.isConditionalExpression()) &&
                !findParentLevel(path, p => p.isObjectProperty(), 1)
            ) {
                // 就是在外面包裹一层{}
                replaceExpression =
                    api.types.JSXExpressionContainer(replaceExpression);
            }
        } else if (path.isJSXText()) {
            replaceExpression =
                api.types.JSXExpressionContainer(replaceExpression);
        }

        // if (api.types.isJSXAttribute(path.parent) || api.types.isJSXText(path)) {
        //   replaceExpression = api.types.JSXExpressionContainer(replaceExpression);
        // }

        // if (
        //   path.findParent(p => p.isJSXAttribute()) &&
        //   !path.findParent(p => p.isJSXExpressionContainer())
        // ) {
        //   replaceExpression = api.types.JSXExpressionContainer(replaceExpression);
        // }
        return replaceExpression;
    };

    return {
        pre(file) {
            // todo
        },

        visitor: {
            Program: {
                enter(path, state) {
                    let imported;
                    path.traverse({
                        ImportDeclaration(p) {
                            const source = p.node.source.value;
                            const importedInfo = p.node.specifiers.find(
                                item =>
                                    item.imported &&
                                    item.imported.name === '@utils/translate.js'
                            );
                            // utils/intl.js 自身就不必引入了，直接跳过
                            if (source.includes('@utils/translate.js')) {
                                imported = true;
                            }
                            if (!imported && importedInfo) {
                                imported = true;
                            }

                            // const source = p.node.source.value;
                            // if (source === '@utils/translate.js') {
                            //     imported = true;
                            // }
                        }
                    });

                    if (!imported) {
                        const uid = path.scope.generateUid('intl');

                        const importAst = api.template.ast(
                            `import ${uid} from '@utils/translate.js'`
                        );

                        path.node.body.unshift(importAst);
                        state.intlUid = uid;
                    }

                    path.traverse({
                        'StringLiteral|TemplateLiteral|JSXElement|JSXFragment|JSXExpressionContainer|JSXText':
                            function (path) {
                                if (path.node.leadingComments) {
                                    path.node.leadingComments =
                                        path.node.leadingComments.filter(
                                            (comment, index) => {
                                                if (
                                                    comment.value.includes(
                                                        'i18n-disable'
                                                    )
                                                ) {
                                                    path.node.skipTransform = true;
                                                    return false;
                                                }
                                                return true;
                                            }
                                        );
                                }

                                if (
                                    path.findParent(p =>
                                        p.isImportDeclaration()
                                    )
                                ) {
                                    path.node.skipTransform = true;
                                }
                            }
                    });
                }
            },

            'StringLiteral|JSXText': function (path, state) {
                if (path.node.skipTransform) {
                    return;
                }

                if (chineseStringReg.test(path.node.value)) {
                    const key = md5(path.node.value);
                    const replaceExpression = getReplaceExpression(
                        path,
                        key,
                        state.intlUid,
                        path.node.value
                    );

                    path.replaceWith(replaceExpression);
                    path.skip();
                } else {
                    path.skip();
                }
            },

            TemplateLiteral(path, state) {
                if (path.node.skipTransform) {
                    return;
                }

                const value1 = path
                    .get('quasis')
                    .map(item => item.node.value.raw)
                    .join('');

                const value = path
                    .get('quasis')
                    .map(item => item.node.value.raw)
                    .join('{placeholder}');

                if (value) {
                    if (chineseStringReg.test(value)) {
                        const key = md5(value);
                        // save(state.file, key, value);
                        const replaceExpression = getReplaceExpression(
                            path,
                            key,
                            state.intlUid,
                            value1
                        );
                        path.replaceWith(replaceExpression);
                        path.skip();
                    } else {
                        path.skip();
                    }
                }
            }
        },

        post(file) {
            // todo
        }
    };
});

module.exports = translatePlugin;
