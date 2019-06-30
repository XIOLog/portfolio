function Menu(menuId, menuClass, menuItems) {
	Container.call(this);
	this.id = menuId;
	this.class = menuClass;
	this.items = menuItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
	let result = '<ul id="' + this.id + '" class="' + this.class + '">';
	for(let item of this.items) {
		if(item instanceof Submenu) {
			result += '<li><a href="#">' + item.title + '</a>' + item.render() + '</li>';
		}

		if(item instanceof MenuItem) {
			result += item.render();
		}
	}
	result += '</ul>';

	this.htmlCode = result;
	return result;
};