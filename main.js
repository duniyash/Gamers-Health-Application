const electron = require('electron');
const url = require('url');
const path = require('path');
const { protocol } = require('electron');

const { app, BrowserWindow, Menu } = electron;

//SET ENV
process.env.NODE_ENV = 'production';

let mainWindow;

//listen for the app to be ready 
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1450,
        height: 950,
        resizable: false,
        useContentSize: true
    });

    Menu.setApplicationMenu(null);

    //load html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'login.html'),
        protocol: 'file',
        slashes: true,
    }));

});