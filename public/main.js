const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const {BrowserWindow, app, ipcMain} = electron;

const createWindow = (dimensions) => {
  let win = new BrowserWindow({
    width: parseInt(dimensions.width * 0.6),
    height: parseInt(dimensions.height * 0.8),
    minWidth: parseInt(dimensions.width * 0.45),
    minHeight: parseInt(dimensions.height * 0.6),
    maxWidth: dimensions.width,
    maxHeight: dimensions.height,
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
  const electronScreen = electron.screen;
  const display = electronScreen.getPrimaryDisplay();
  const dimensions = display.workAreaSize;
  win1 = createWindow(dimensions);
  win2 = createWindow(dimensions);
});

const conversation = "chatbox-msg";
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

const groupChatEvent = "create-groupchat";
ipcMain.on(groupChatEvent, (event, message) => {
  let { id } = BrowserWindow.getFocusedWindow();
  if (id === 1) {
    win2.webContents.send(groupChatEvent, message);
  }
  if (id === 2) {
    win1.webContents.send(groupChatEvent, message);
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