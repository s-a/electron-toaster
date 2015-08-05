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

document.getElementById("title").innerHTML = getQueryVariable("title");
document.getElementById("message").innerHTML = getQueryVariable("message");
document.getElementById("detail").innerHTML = getQueryVariable("detail");

var onKeydown = function(/*e*/) {
	window.close();
};

document.addEventListener("click", window.close);
document.addEventListener("keydown", onKeydown, false);

window.setTimeout(function() {
	this.close();
}, parseInt(getQueryVariable("timeout")));