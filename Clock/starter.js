var context_menu_items = [
	{
		id: "1",
		title: "Fonts",
		visible: true,
		contexts: ["all"]
	},
	{
		id: "2",
		title: "Fira Code",
		visible: true,
		contexts: ["all"],
		parentId: "1"
	},
	{
		id: "3",
		title: "Varela Round",
		visible: true,
		contexts: ["all"],
		parentId: "1"
	},
	{
		id: "4",
		title: "Font color",
		visible: true,
		contexts: ["all"]
	},
	{
		id: "5",
		title: "White",
		visible: true,
		contexts: ["all"],
		parentId: "4"
	},
	{
		id: "7",
		title: "Purple",
		visible: true,
		contexts: ["all"],
		parentId: "4"
	},
	{
		id: "6",
		title: "Shift",
		visible: true,
		contexts: ["all"],
		parentId: "4"
	}
];
chrome.app.runtime.onLaunched.addListener(function() {
	for (var i = 0; i < context_menu_items.length; i++) {
		chrome.contextMenus.create(context_menu_items[i]);
	};
  	chrome.app.window.create('Index.html', {
    id: 'Clock',
    bounds: { width: 240, height: 100 }
  });
});