// 'use strict';

const os = require('os');
const codeFrame = require('@babel/code-frame').codeFrameColumns;
const chalk = require('chalk');
const fs = require('fs');

const types = { diagnostic: 'TypeScript', lint: 'TSLint' };

function formatter(message) {
    const {
        severity,
        file,
        line,
        code,
        character,
        origin,
        message: message1,
        stack
    } =
        typeof message.getFile === 'function'
            ? {
                  severity: message.getSeverity(),
                  file: message.getFile(),
                  line: message.getLine(),
                  code: message.getCode(),
                  character: message.getCharacter()
              }
            : message;

    const fileAndNumberColor = chalk.bold.green;

    const source =
        file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8');
    const frame = source
        ? codeFrame(
              source,
              { start: { line: line, column: character } },
              { highlightCode: 'red' }
          )
              .split('\n')
              .map(str => '  ' + str)
              .join(os.EOL)
        : '';
    return [
        chalk.bold.red(`${severity.toLowerCase()} in `) +
            fileAndNumberColor(`${file}(${line},${character})`) +
            chalk.bold.red(':'),
        chalk.bold(message1),
        frame
    ].join(os.EOL);
}

module.exports = formatter;
