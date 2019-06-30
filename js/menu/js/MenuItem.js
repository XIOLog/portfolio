function MenuItem(href, title) {
	this.title = title;
	this.href = href;
}

MenuItem.prototype.render = function() {
	return '<li class="menuItem"><a href="' + this.href + '">' + this.title + '</a></li>';
};