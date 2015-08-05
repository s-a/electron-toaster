# Usage

```javascript
	var Toaster = require("electron-toaster");
	var toaster = new Toaster();

	var msg = {
		title : "Awesome!",
		message : "Check this out!",
		detail : "PI is equal to 3! - 0.0",
		width : 440,
		height : 160,
		timeout : 6000
	}

	toaster.show(msg);
```
  
![screenshot](/screenshot.png)  
