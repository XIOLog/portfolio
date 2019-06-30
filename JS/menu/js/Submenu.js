function Submenu(smTitleParent, smId, smClass, smItems) {
	Menu.call(this);
	this.title = smTitleParent;
	this.id = smId;
	this.class = smClass;
	this.items = smItems;
}

Submenu.prototype = Object.create(Menu.prototype);
Submenu.prototype.constructor = Submenu;