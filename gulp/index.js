'use strict';

const fs = require('fs');
const tasksPath = `${__dirname}/tasks`;

module.exports = function (gulp) {
    fs.readdirSync(tasksPath)
        .forEach((file) => require(`${tasksPath}/${file}`)(gulp))
};