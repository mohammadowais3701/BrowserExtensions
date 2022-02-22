chrome.storage.onChanged.addListener(function (changes, namespace) {
    sessionStorage.clear();
  });