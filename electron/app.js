const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let window;

const menuTemplate = [
    {
        label: "Embedder",
        click() {
            window.loadURL(url.format({
                pathname: path.join(__dirname, 'render/embed.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
    },
    {
        label: "Extractor",
        click() {
            window.loadURL(url.format({
                pathname: path.join(__dirname, 'render/extract.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
    },
    {
        label: "Help",
        click() {
            window.loadURL(url.format({
                pathname: path.join(__dirname, 'render/help.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
    },
    {
        label: "About",
        click() {
            window.loadURL(url.format({
                pathname: path.join(__dirname, 'render/about.html'),
                protocol: 'file:',
                slashes: true
            }));
        }
    }
];

app.on('ready', () => {
    // Create browser window
    window = new BrowserWindow({ width: 1100, height: 600, title: "Image Steganographer" });

    // Change the default menu
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Load index.html 
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'render/embed.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Garbage collection
    window.on('close', function () {
        window = null;
    });

})