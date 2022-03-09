const electron = require('electron');
const url = require('url');
const path = require('path');
const { protocol } = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//listen for the app to be ready 
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1450,
        height: 900,
        resizable: false
    });

    Menu.setApplicationMenu(null);

    //load html



    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dashboard.html'),
        protocol: 'file',
        slashes: true,
    }));

});