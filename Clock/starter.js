var FiraCode = {
		id: "1",
		title: "Fira Code",
		visible: true,
		contexts: ["all"]
};
var Varela = {
		id: "2",
		title: "Varela Round",
		visible: true,
		contexts: ["all"]
};
chrome.app.runtime.onLaunched.addListener(function() {
	chrome.contextMenus.create(FiraCode);
	chrome.contextMenus.create(Varela);
  	chrome.app.window.create('Index.html', {
    id: 'Clock',
    bounds: { width: 240, height: 100 }
  });
});