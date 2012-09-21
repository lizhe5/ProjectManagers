chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('/', {
    'width': 400,
    'height': 500
  });
});