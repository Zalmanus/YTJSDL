const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(maninMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create add window
function createAddWindow(){
        //create new window
        addWindow = new BrowserWindow({
            width: 300,
            height: 200,
            title: 'Add shopping list item'
        });
        //Load html into window
        addWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'addWindow.html'),
            protocol:'file:',
            slashes: true
        }));
        //Garbage collection handle
        addWindow.on('close', function(){
            addWindow = null;
        });
}

//Create menu template
const maninMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//If mac, add empty object to menu
if(process.platform == 'darwin'){
    maninMenuTemplate.unshift({});
}

// Add developer tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    maninMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
        
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}