// TripSplit desktop window. Loads the app stored in the "app" folder.
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 820,
    minWidth: 380,
    minHeight: 600,
    title: 'TripSplit',
    autoHideMenuBar: true,
    backgroundColor: '#f6f7f4',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Links to other websites (for example the Anthropic console) open in the normal browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
