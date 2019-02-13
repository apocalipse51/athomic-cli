const fs = require('fs');
const path = require('path');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const colors = require('colors');
module.exports = {

    getCurrentDirectoryBase : () => {
        return path.basename(process.cwd());
    },

    directoryExists : (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    createBaseDirectory: async directoryName => {

        let pathFolder = path.join(__dirname, directoryName).replace('\\athomic-cli\\lib', '');
        
        let access = fs.existsSync(pathFolder);

        if(!access) {

            fs.mkdir(pathFolder, { recursive: true },
                response => {                    

                    // On Windows Only ...
                    const { exec } = require('child_process');

                    let status = new Spinner('Cloning Athomic repository...');
                    status.start();
                    exec(`cd ${directoryName} && git clone https://github.com/apocalipse51/athomic.git .`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }
                        status.stop();
                        status = new Spinner('Installing Athomic dependencies...');
                        status.start();
                        exec(`cd ${directoryName} && npm install`, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(stderr);
                            status.stop();
                            let endProcessMessage = `cd ${directoryName}`;
                            console.log(endProcessMessage.blue);
                        });                        
                    });

                }, 
                err => {
                    console.log(`An error occur and the project couldn't be created!`);
                    if (err) throw err;
                }
            );

        } else {
            console.log(`Already exist a folder with the name "${directoryName}", then the project can't be crated!`);
        }

    }

};
