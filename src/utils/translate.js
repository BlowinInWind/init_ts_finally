/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-plusplus */
const localLanguage = navigator.language.toLocaleLowerCase();

let definition;

try {
    definition = require(`../../i18n-messages/${localLanguage}.json`);
} catch {
    definition = require('../../i18n-messages/zh-cn.json');
}

const t = function (key, value, ...args) {
    let index = 0;
    return definition[key]
        ? definition[key].replace(/\{placeholder\}/, () => args[index++])
        : value;
};

export default { t };
