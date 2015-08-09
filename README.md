# Installation

```bash
$ npm install electron-toaster;
```

# Usage

```javascript
// In main process.
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var Toaster = require('electron-toaster');
var toaster = new Toaster();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({});
	toaster.init(mainWindow);

  	mainWindow.on('devtools-opened', function() {
        mainWindow.loadUrl('file://' + __dirname + '/index.html');
    });

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
```


```javascript
// In renderer process (web page).

var ipc = require('ipc');
var msg = {
    title : "Awesome!",
    message : "Check this out!<br>Check this out!<br>Check this out!<br>Check this out!<br>Check this out!<br>Check this out!<br>",
    detail : "PI is equal to 3! - 0.0<br>PI is equal to 3! - 0.0<br>PI is equal to 3! - 0.0<br>PI is equal to 3! - 0.0<br>",
    width : 440,
    // height : 160, window will be autosized
    timeout : 6000,
    focus: true // set focus back to main window
};
ipc.send('electron-toaster-message', msg);
```

![screenshot](/screenshot.png)