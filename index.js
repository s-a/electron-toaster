
var BrowserWindow = require('browser-window');  // Module to create native browser window.
// In main process.
var ipc = require('ipc');


var showToaster = function(currentWindow, msg) {
	var self = this;
	this.window = new BrowserWindow({
		width: msg.width,
		/*height: 1,*/
		title : msg.title || "toaster",
		icon: __dirname + '/icon.png',
		transparent: false,
		frame: false,
		show : false,
		"skip-taskbar": true,
		"always-on-top": true
	});


	var timer,height, width;
	var screen = require('screen');
	var pos = currentWindow.getPosition();
	var display = screen.getDisplayNearestPoint({x:pos[0], y:pos[1]});

	this.window.on('closed', function() {
		try{
			clearTimeout(timer) ;
			self.window = null;
		}catch(e){}
	});

	var moveWindow = function(pos, done) {
		try{
			self.window.setPosition(display.workAreaSize.width - width - 4, pos);
		} catch(e){} finally {
			done();
		}
	};

	var i = 0;
	var slideUp = function  (cb) {
		if (i < height){
			i += Math.round(height/10);
			timer = setTimeout(function  () {
				moveWindow(display.workAreaSize.height - i, function(){
					if (i === Math.round(height/10)){ // show after first pos set to avoid flicker.
						self.window.show();
						if (msg.focus === undefined || msg.focus){
							currentWindow.focus();
						}
					}
					slideUp(cb);
				});
			}, 1);
		} else {
			cb();
		}
	};


	var htmlFile = msg.htmlFile || 'file://' + __dirname + '/toaster.html?';
	htmlFile += htmlFile + 'foo=bar&title=' + encodeURIComponent(msg.title || "") + '&message=' + encodeURIComponent(msg.message || "") + '&detail=' + encodeURIComponent(msg.detail || "") + "&timeout=" + (msg.timeout || 5000);
	this.window.loadUrl(htmlFile);

	/*
		# for debugging
		this.window.maximize();
		this.window.openDevTools();
	*/

	this.window.webContents.on('did-finish-load', function(){
		if (self.window){
			width = self.window.getSize()[0];
			height = self.window.getSize()[1];
			slideUp(function(){});
		}
		/*
			# since https://github.com/atom/electron/issues/2425 --> code goes to client.js
			var window = this;
			window.document.addEventListener("click", this.window.close);
			window.document.getElementById("description").innerHTML = "helo";
			window.document.getElementById("details").innerHTML = "helo";
			window.document.getElementById("title").innerHTML = "helo";
		*/
	});
};

var Toaster = function(){
	return this;
};

Toaster.prototype.init = function(currentWindow) {
	ipc.on('electron-toaster-message', function(event, msg) {
	  showToaster(currentWindow, msg);
	});
};


module.exports = Toaster;