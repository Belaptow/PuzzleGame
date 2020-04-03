
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = require('electron');

require('./style.css');

const createWindow = () => {
    console.log("create window");
    window = new BrowserWindow({ width: 800, height: 600 });
    console.log("window created");
    window.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );
    console.log("loaded");
    //window.webContents.openDevTools()
    console.log("devTools opened");
    window.on("closed", () => {
        window = null;
    });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});