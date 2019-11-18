chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('Index.html', {
    id: 'Clock',
    bounds: { width: 240, height: 100 }
  });
});