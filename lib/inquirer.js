const inquirer = require('inquirer');
const files = require('./files');
const fs = require('fs');

module.exports = {

  askFolderOptions: () => {

    const argv = require('minimist')(process.argv.slice(2));

    inquirer
      .prompt([
        {
          name: 'foldername',
          type: 'input',
          message: 'Enter your folder name:',
          default: argv._[0] || files.getCurrentDirectoryBase(), 
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Please enter your foldername.';
            }
          }
        }
      ])
      .then(answers => files.createBaseDirectory(answers.foldername));

  }

};
