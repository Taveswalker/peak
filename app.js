const electron = require('electron');
const {app, BrowserWindow, Menu, globalShortcut} = electron;

app.on('ready', () => {
    //requiring display after app is loaded (it's necessary)
    const display = electron.screen.getPrimaryDisplay();
    const workArea = {width: display.workArea.width, height: display.workArea.height}

    //window initialization linking to index.html
    let win = new BrowserWindow({width: (workArea.width*.2), height: workArea.height, resizable: false, movable: false, x: (workArea.width - win.width),y: 0});
    win.loadURL(`file://${__dirname}/index.html`);

    //construct and implement menu
    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Menu.setApplicationMenu(mainMenu);
    win.setMenu(null);

    //Ensure all  child windows are closed when main window is closed
    win.on('close', () => {
        app.quit();
    })

    //keyboard shortcuts
    globalShortcut.register('CommandOrControl+H', () => { //help
        //initialize help window
        let helpWin = new BrowserWindow({width: 300, height: 200});
        helpWin.loadURL(`file://${__dirname}/help.html`);
    });
    globalShortcut.register('CommandOrControl+Q', () => { //quit
        app.quit();
    });
    globalShortcut.register('CommandOrControl+`', () => { //dev tools
        win.toggleDevTools();
    });
})
