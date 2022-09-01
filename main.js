const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');
const Log = require('./models/Log');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

let mainWindow;

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === 'development'
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1400 : 1100,
    height: 800,
    show: false,
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open devtools if dev
    // if (isDev) {
    // 	const {
    // 		default: installExtension,
    // 		REACT_DEVELOPER_TOOLS,
    // 	} = require('electron-devtools-installer')

    // 	installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
    // 		console.log('Error loading React DevTools: ', err)
    // 	)
    // 	mainWindow.webContents.openDevTools()
    // }

    if (isDev) {
    }
    mainWindow.webContents.openDevTools();
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createMainWindow);
ipcMain.on('logs:load', sendLogs); // Listen for logs:load

async function sendLogs() {
  try {
    const logs = await Log.find().sort({ created: 1 });
    mainWindow.webContents.send('logs:get', JSON.stringify(logs));
    console.log(logs);
  } catch (err) {
    console.log(err);
  }
}

// Create log
ipcMain.on('logs:add', async (e, item) => {
  try {
    await Log.create(item);
    sendLogs();
  } catch (err) {
    console.log(err);
  }
});

// Delete log
ipcMain.on('logs:delete', async (e, id) => {
  try {
    await Log.findByIdAndDelete(id);
    sendLogs();
  } catch (err) {
    console.log(err);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
