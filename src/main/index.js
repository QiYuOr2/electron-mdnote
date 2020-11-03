const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { create: createAboutWindow } = require('./about');
const path = require('path');

let win;
let top = false;

app.on('ready', () => {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    title: 'MD便签',
    width: 400,
    height: 700,
    frame: false,
    resizable: false,
    transparent: true,
    maximizable: false,
    icon: path.resolve(__dirname, '../../icon.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.loadFile(path.resolve(__dirname, '../renderer/index.html'));

  ipcHandle();
});

// 处理进程间通信
function ipcHandle() {
  ipcMain.handle('window-close', function () {
    app.quit();
  });

  ipcMain.handle('window-min', function () {
    win.minimize();
  });

  ipcMain.handle('right-click', function () {
    // 改变窗口置顶状态
    function changeTopStatus() {
      const menuItem = menu.getMenuItemById('top');
      top = !top;
      menuItem.checked = top;
      win.setAlwaysOnTop(top);
      // 改变渲染进场的状态显示
      win.webContents.send('win-status-change', top);
    }
    // 右键菜单
    const rightMenu = [
      {
        label: '置顶',
        id: 'top',
        type: 'checkbox',
        checked: top,
        click: changeTopStatus,
      },
      { type: 'separator' },
      {
        label: '关于',
        click: () => {
          createAboutWindow();
        },
      },
    ];
    const menu = Menu.buildFromTemplate(rightMenu);
    menu.popup();
  });
}
