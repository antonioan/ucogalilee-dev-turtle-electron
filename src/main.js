const {app, BrowserWindow, Menu, shell} = require('electron');
const path = require('path');

const menuItems = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'About',
            },
        ],
    },
    {
        label: 'File',
        submenu: [
            {
                label: 'Open Camera',
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 400,
                        width: 500,
                        show: false,
                        backgroundColor: '#2e2d29',
                    });
                    win2.once('ready-to-show', () => win2.show());
                    win2.webContents.openDevTools();
                    await win2.loadFile('src/camera/camera.html');
                }
            },
            {
                label: 'Learn More',
                click: async () => {
                    await shell.openExternal('https://google.com');
                }
            },
            {
                type: 'separator',
            },
            {
                role: 'quit',
            },
        ],
    },
    {
        label: 'Window',
        submenu: [
            {
                role: 'minimize',
            },
            {
                role: 'close',
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        height: 500,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js')
        },
    });

    win.loadFile('src/index/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
