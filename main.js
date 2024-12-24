import electron from 'electron';  // Use default import for Electron
import { createServer } from './app.js'; // Assuming your app.js exports createServer function

let mainWindow = null;

function main() {
    const { server, port } = createServer(); 

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,  // Ensure this is enabled for your app to work as expected
        }
    });
    mainWindow.loadURL(`http://localhost:3000/`); // Adjust the URL if necessary
    mainWindow.on('close', (event) => {
        mainWindow = null;
    });
};

app.on('ready', main);
