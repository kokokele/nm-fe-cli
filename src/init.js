'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('./storeConfig')
const chalk = require('chalk')

module.exports = () => {
 	co(function *() {

    let storeName = yield prompt('project name: ');

    const store = config[storeName].uri;

    if(!store) {
        console.log(chalk.red('\n 没有找到 %s 的项目配置'), storeName);
        process.exit();
    }

    const getName = 'git config --global user.name';

    exec(getName, (error, stdout, stderr) => {

        const emailName = stdout.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

        let cmdStr = `git clone ssh://${emailName}@${store}`;

        console.log(chalk.blue('\n 项目地址: %s'), store);
        console.log(chalk.yellow('\n 开始clone.....'))

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }
            console.log(chalk.green('\n √ 项目下载完成'));
            process.exit()
        })
    })


  })
}
