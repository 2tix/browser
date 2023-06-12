const {app, BrowserWindow, BrowserView, ipcMain} = require("electron");
const path = require("path");
const url = require("url");

const prod = false;
let win;
let src = "https://www.google.com/search?igu=1";
let view;

const resize = () => {
    view.setBounds({
        x: Math.floor(win.getBounds().width * 0.00833),
        y: Math.floor(win.getBounds().height * 0.075),
        width: Math.floor(win.getBounds().width * 0.9833),
        height: Math.floor(win.getBounds().height * 0.9125),
    });
};

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    view = new BrowserView();
    win.setBrowserView(view);
    resize();
    view.setAutoResize({width: true, height: true});
    view.webContents.loadURL(src);

    ipcMain.on("url", (event, arg) => {
        src = arg;
        view = new BrowserView();
        win.setBrowserView(view);
        resize();
        view.setAutoResize({width: true, height: true});
        if(src.includes("http://") || src.includes("https://")) {
            view.webContents.loadURL(src);
        } else {
            if(hasTLD(src)) {
                view.webContents.loadURL("https://" + src);
            } else {
                view.webContents.loadURL("https://www.google.com/search?igu=1&q=" + encodeURIComponent(src));
            }
        }
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

function hasTLD(str) {
    const regex = /\.(?:[a-z]{2,}|xn--[a-z0-9]+)(?:\/[^\s]*)?$/i;
    return regex.test(str);
}
