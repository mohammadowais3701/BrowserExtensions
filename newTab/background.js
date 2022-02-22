chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "http://www.google.com/";
    sessionStorage.clear();
    chrome.tabs.create({ url: newURL });
  });