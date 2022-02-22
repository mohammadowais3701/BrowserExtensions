var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",
        host: "45.140.172.11",
        port: parseInt(3389)	
      },
      bypassList: ["foobar.com"]
    }
  };

chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});

function callbackFn(details) {
  alert(JSON.stringify(details));
   debugger;
    return {
        authCredentials: {
            username: "raheel",
            password: ":sFD89zfsvw"
        }
    };
}

chrome.webRequest.onAuthRequired.addListener(
        callbackFn,
        {urls: ["<all_urls>"]},
        ['blocking']
);