function Container() {
	this.htmlCode = '';
}

Container.prototype.render = function() {
	return this.htmlCode;
};

Container.prototype.remove = function() {
	document.getElementById('menu').remove();
};