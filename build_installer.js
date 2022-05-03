// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "D:\Coding\SDGP\Gamers-Health-Application\Physico-win32-x64", 
const APP_DIR = path.resolve(__dirname, './Physico-win32-x64');
// outputDirectory: "D:\Coding\SDGP\Gamers-Health-Application\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './windows_installer');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: "Physico, Gamer's health application.",
    exe: 'Physico',
    name: 'Physico Desktop App',
    manufacturer: 'team 1THIRTY8',
    version: '1.0.0',

    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){
    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
});