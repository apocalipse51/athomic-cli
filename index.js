#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const inquirer = require('./lib/inquirer');

//Clear console older outputs
clear();
console.log(
    chalk.red(
        figlet.textSync('Athomic', { horizontalLayout: 'full' })
    )
);

(async function() {
    inquirer.askFolderOptions();
})();