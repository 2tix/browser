const {app, BrowserWindow, BrowserView, ipcMain} = require("electron");
const path = require("path");
const url = require("url");

const prod = false;
let win;
let src = "https://www.google.com/search?igu=1";
let view;

const resize = () => {
    view.setBounds({
        x: Math.floor(win.getBounds().width * 0.1125),
        y: Math.floor(win.getBounds().height * 0.075),
        width: Math.floor(win.getBounds().width * 0.875),
        height: Math.floor(win.getBounds().height * 0.9125),
    });
};

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    view = new BrowserView();
    win.setBrowserView(view);
    resize();
    view.setAutoResize({width: true, height: true});
    view.webContents.loadURL(src);

    ipcMain.on("url", (event, arg) => {
        src = arg;
        view.webContents.loadURL(src);
    });

    if (!prod) {
        // win.webContents.openDevTools();
    }

    win.on("closed", () => {
        win = null;
    });
    win.on("resize", () => {
        resize();
    });

    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
};

app.on("ready", createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("url", url => {
    console.log(url);
});