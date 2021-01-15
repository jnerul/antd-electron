const { app, BrowserWindow, dialog, ipcMain, Menu, remote } = require('electron')
const { clipboard } = require('electron')


function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    icon: 'src/resource/icon.png',
    show: false,
  })
  win.maximize();
  // 并且为你的应用加载index.html
  win.loadFile('src/zpert.html')
  win.webContents.openDevTools();
  win.show();

  // win.setProgressBar(0.5)

  console.log(BrowserWindow);
  console.log(win);
  // const appIcon = new Tray('src/resource/icon.png')
  // win.setIcon(appIcon)

  win.webContents.send('workdir', app.getAppPath());


  ipcMain.handle('savefileas', async (event, someArgument) => {
    var filters = [];
    filters.push(someArgument);
    filters.push({ name: 'All Files', extensions: ['*'] });
    return new Promise(function (resolve, reject) {
      dialog.showSaveDialog({
        properties: ['另存为'],
        filters: filters
      }).then(result => {
        if (!result.canceled) {
          resolve(result.filePath);
        }
      }).catch(err => { });
    });
  });

  ipcMain.on('openfile', (e, msg) => {
    win.webContents.send('workdir', app.getAppPath());
  });

  ipcMain.on('writeclipboard', (e, msg) => {
    if (msg)
      clipboard.writeText(msg);
    else
      clipboard.clear();
  });

  ipcMain.handle('getapppath', async (event, someArgument) => {
    return app.getAppPath();
  });

  (function initMenu() {
    const isMac = process.platform === 'darwin'

    const template = [
      // { role: 'appMenu' }
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }] : []),
      // { role: 'fileMenu' }
      {
        label: '文件',
        submenu: [
          {
            label: '新建',
            click: async () => {
              // view_interface.newFile();
              win.webContents.send('newfile');
            }
          },
          {
            label: '打开文件',
            click: async () => {
              dialog.showOpenDialog({
                properties: ['openFile']
              }).then(result => {
                if (!result.canceled) {
                  // view_interface.openFile(result.filePaths[0]);
                  // ipcMain.emit('openfile', result.filePaths[0]);
                  win.webContents.send('openfile', result.filePaths[0]);
                }
              }).catch(err => { });

            }
          },
          {
            label: '另存为',
            click: async () => {
              dialog.showSaveDialog({
                properties: ['另存为']
              }).then(result => {
                if (!result.canceled) {
                  // view_interface.saveFile(result.filePath);
                  win.webContents.send('savefile', result.filePath);
                }
              }).catch(err => { });
            }
          },
          isMac ? { role: 'close' } : { label: '退出', role: 'quit' }
        ]
      },
      // { role: 'editMenu' }
      {
        label: '编辑',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startspeaking' },
                { role: 'stopspeaking' }
              ]
            }
          ] : [
              { role: 'delete' },
              { type: 'separator' },
              { role: 'selectAll' }
            ])
        ]
      },
      // { role: 'viewMenu' }
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      // { role: 'windowMenu' }
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ] : [
              { role: 'close' }
            ])
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron')
              await shell.openExternal('https://electronjs.org')
            }
          }
        ]
      }
    ]

    const menu = Menu.buildFromTemplate([])
    // console.log(menu)
    Menu.setApplicationMenu(null)
  })();
}




app.whenReady().then(createWindow)


