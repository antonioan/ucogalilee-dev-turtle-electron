const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { ipcMain } = require("electron-better-ipc");
const http = require("http");
const crypto = require("crypto")

// // Keep a global reference of the window object so that GC would not close the window
// let mainWindow;
//
// async function createWindow() {
//     if (!app.isPackaged) {
//         // Install the React component viewer and profiler
//         await installExtension([REACT_DEVELOPER_TOOLS])
//             .then((name) => console.log(`Added extension:  ${name}`))
//             .catch((err) => console.log(`An error occurred: ${err}`));
//     }
//
//     mainWindow = new BrowserWindow({
//         // height: 500,
//         // width: 800,
//         autoHideMenuBar: true,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//             webSecurity: false
//         }
//     });
//     mainWindow.maximize();
//
//     const startURL = process.env.ELECTRON_START_URL || path.join(__dirname, "/../build/index.html")
//
//     await mainWindow.loadURL(startURL);
//
//     mainWindow.on("closed", function () {
//         mainWindow = null
//     })
//
//     await mainWindow.webContents.setVisualZoomLevelLimits(1, 10);
//
//     if (!app.isPackaged) {
//         mainWindow.webContents.openDevTools();
//     }
//
// }
//
// const isMac = process.platform === 'darwin'
//
// const template = [
//     // { role: 'appMenu' }
//     ...(isMac ? [{
//         label: app.name,
//         submenu: [
//             { role: 'about' },
//             { type: 'separator' },
//             { role: 'services' },
//             { type: 'separator' },
//             { role: 'hide' },
//             { role: 'hideOthers' },
//             { role: 'unhide' },
//             { type: 'separator' },
//             { role: 'quit' }
//         ]
//     }] : []),
//     // { role: 'fileMenu' }
//     {
//         label: 'File',
//         submenu: [
//             isMac ? { role: 'close' } : { role: 'quit' }
//         ]
//     },
//     // { role: 'editMenu' }
//     {
//         label: 'Edit',
//         submenu: [
//             { role: 'undo' },
//             { role: 'redo' },
//             { type: 'separator' },
//             { role: 'cut' },
//             { role: 'copy' },
//             { role: 'paste' },
//             ...(isMac ? [
//                 { role: 'pasteAndMatchStyle' },
//                 { role: 'delete' },
//                 { role: 'selectAll' },
//                 { type: 'separator' },
//                 {
//                     label: 'Speech',
//                     submenu: [
//                         { role: 'startSpeaking' },
//                         { role: 'stopSpeaking' }
//                     ]
//                 }
//             ] : [
//                 { role: 'delete' },
//                 { type: 'separator' },
//                 { role: 'selectAll' }
//             ])
//         ]
//     },
//     // { role: 'viewMenu' }
//     {
//         label: 'View',
//         submenu: [
//             { role: 'reload' },
//             { role: 'forceReload' },
//             { role: 'toggleDevTools' },
//             { type: 'separator' },
//             { role: 'resetZoom' },
//             { role: 'zoomIn' },
//             { role: 'zoomOut' },
//             { type: 'separator' },
//             { role: 'togglefullscreen' }
//         ]
//     },
//     // { role: 'windowMenu' }
//     {
//         label: 'Window',
//         submenu: [
//             { role: 'minimize' },
//             { role: 'zoom' },
//             ...(isMac ? [
//                 { type: 'separator' },
//                 { role: 'front' },
//                 { type: 'separator' },
//                 { role: 'window' }
//             ] : [
//                 { role: 'close' }
//             ])
//         ]
//     },
//     {
//         role: 'help',
//         submenu: [
//             {
//                 label: 'Learn More',
//                 click: async () => {
//                     const { shell } = require('electron')
//                     await shell.openExternal('https://electronjs.org')
//                 }
//             }
//         ]
//     }
// ]
//
// const menuItems = [
//     {
//         label: "&Projector",
//         submenu: [
//             {
//                 label: "Add projector",
//                 click: async () => {}
//             },
//             {
//                 type: "separator",
//             },
//         ],
//     },
//     {
//         label: "&Fetch",
//         submenu: [
//             {
//                 label: "Bible",
//                 click: async () => {}
//             },
//             {
//                 type: "separator",
//             },
//             {
//                 label: "Chordat",
//                 click: async () => {}
//             },
//             {
//                 label: "Takla",
//                 click: async () => {}
//             },
//         ],
//     }
// ];
//
// Menu.setApplicationMenu(Menu.buildFromTemplate([...template, ...menuItems]));
//
// app.on("ready", createWindow);

let server;
let serverWindow;

app.on("ready", function () {
    // ipcMain.on("console", function (event, ...args) {
    //     console.log(args);
    //     event.returnValue = true;
    // });
    //
    // ipcMain.on("app", function (event, args) {
    //     event.returnValue = app[msg].apply(app, args);
    // });

    serverWindow = new BrowserWindow({show: true});
    serverWindow.webContents.openDevTools()

    serverWindow.loadURL(path.join("file://", __dirname, "index.html"));

    serverWindow.webContents.once("did-finish-load", function () {
        server = http.createServer(function (req, res) {
            const port = crypto.randomBytes(16).toString("hex");
            ipcMain.once(port, function (event, status, head, body) {
                res.writeHead(status, head);
                res.end(body);
            });
            serverWindow.webContents.send("request", req.url, port);
        });
        server.listen(8000);
        console.log("Turtle server is up at http://localhost:8000/");
    });
});

// app.on("window-all-closed", () => {
//     // On macOS, it is common for applications to stay active until the user quits explicitly
//     if (process.platform !== "darwin") {
//         app.quit()
//     }
// });
//
// app.on("activate", async () => {
//     if (mainWindow === null) {
//         await createWindow();
//     }
// });
