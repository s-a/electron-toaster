var remote = require("remote");
var BrowserWindow = remote.require('browser-window');  // Module to create native browser window.

var Toaster = function  () {
	return this;
}

Toaster.prototype.show = function(msg) {
	var self = this;
	var height = msg.height;
	var width = msg.width;

	this.window = new BrowserWindow({
		width: width,
		height: height,
		title : msg.title || "toaster",
		icon: __dirname + '/icon.png',
		transparent: false,
		frame: false,
		show : false,
		"skip-taskbar": true,
		"always-on-top": true
	});


	var timer ;
	var screen = remote.require('screen');
	var pos = remote.getCurrentWindow().getPosition();
	var display = screen.getDisplayNearestPoint({x:pos[0], y:pos[1]});
	var newWidh = display.workAreaSize.width - width;
	this.window.setPosition(newWidh, display.workAreaSize.height);

	/*this.window.on('closed', function() {
		try{
			clearTimeout(timer) ;
			self.window = null;
		}catch(e){}
	});*/

	var moveWindow = function(pos, done) {
		self.window.setPosition(newWidh, pos);
		done();
	};


	var i = 0;
	var slideUp = function  (cb) {
		if (i < height){
			i += Math.round(height/10);
			timer = setTimeout(function  () {
				moveWindow(display.workAreaSize.height - i, function(){
					slideUp(cb);
				});
			}, 1);
		} else {
			cb();
		}
	};

	this.window.setPosition(newWidh, display.workAreaSize.height);
	var htmlFile = msg.htmlFile || 'file://' + __dirname + '/toaster.html?';
	this.window.loadUrl(htmlFile + 'foo=bar&title=' + encodeURIComponent(msg.title || "") + '&message=' + encodeURIComponent(msg.message || "") + '&detail=' + encodeURIComponent(msg.detail || "") + "&timeout=" + msg.timeout || 5000 );

	this.window.webContents.on('dom-ready', function(){
		self.window.show();
		slideUp(function(){});
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

module.exports = Toaster;