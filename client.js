function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] === variable) {
			return decodeURIComponent(pair[1]);
		}
	}
}

var autoSize = function() {
	var heightOffset = window.outerHeight - window.innerHeight;
	var widthOffset = window.outerWidth - window.innerWidth;
	var result = {
		height : document.getElementById("content").clientHeight + heightOffset,
		width : document.getElementById("content").clientWidth + widthOffset
	}

	window.resizeTo(result.width, result.height);

	return result;
};


var onKeydown = function(/*e*/) {
	window.close();
};

var onLoad = function load(/*event*/){
	autoSize();
    this.removeEventListener("load", load, false); //remove listener, no longer needed

	this.setTimeout(function() {
		this.close();
	}, parseInt(getQueryVariable("timeout")));

	document.addEventListener("keydown", onKeydown, false);
	document.addEventListener("click", window.close);
};

document.getElementById("title").innerHTML = getQueryVariable("title");
document.getElementById("message").innerHTML = getQueryVariable("message");
document.getElementById("detail").innerHTML = getQueryVariable("detail");
window.addEventListener("load", onLoad, false);