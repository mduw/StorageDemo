const electron = require("electron");
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

const createWindow = () => {
  let win = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: { webSecurity: false },
  });
  win.webContents.openDevTools();
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.on("closed", () => (win = null));
  return win;
}
let win1;
let win2;
app.on("ready", () => {
  win1 = createWindow();
  win2 = createWindow();
});

let conversation = "chatbox-msg";
ipcMain.on(conversation, (event, message) => {
  let { id } = BrowserWindow.getFocusedWindow();
  if (id === 1) {
    win2.webContents.send(conversation, message);
  }
  if (id === 2) {
    win1.webContents.send(conversation, message);
  }
  event.returnValue = `SUCCESS`;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    messages = [];
    app.quit();
  }
});

app.on("activate", () => {
  if (win1 === null) {
    win1 = createWindow();
  }
  if (win2 === null) {
    win2 = createWindow();
  }
});
