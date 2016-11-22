const config = require('./storeConfig')
const chalk = require('chalk')

module.exports = () => {
    for(var key in config) {
        const item = config[key];
        console.log(chalk.bgGreen("%s : %s-%s"), key, item.desc, item.uri);
    }
}
