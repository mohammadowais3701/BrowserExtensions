
// function include(file) {
  
//   var script  = document.createElement('script');
//   script.src  = file;
//   script.type = 'text/javascript';
//   script.defer = true;
  
//   window.document.getElementsByTagName('head').item(0).appendChild(script);
  
// }
// include('content_script.js');
(function() {
  const tabStorage = {};
  const networkFilters = {
      urls: [
        "*://*.google.com/"
      ]
  };

  chrome.webRequest.onBeforeRequest.addListener((details) => {
      const { tabId, requestId } = details;
      if (!tabStorage.hasOwnProperty(tabId)) {
        alert(tabId);
          return;
      }

      tabStorage[tabId].requests[requestId] = {
          requestId: requestId,
          url: details.url,
          startTime: details.timeStamp,
          status: 'pending'
      };
      console.log(tabStorage[tabId].requests[requestId]);
  }, networkFilters);

  chrome.webRequest.onCompleted.addListener((details) => {
      const { tabId, requestId } = details;
      if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
          return;
      }

      const request = tabStorage[tabId].requests[requestId];

      Object.assign(request, {
          endTime: details.timeStamp,
          requestDuration: details.timeStamp - request.startTime,
          status: 'complete'
      });
      console.log(tabStorage[tabId].requests[details.requestId]);
  }, networkFilters);

  chrome.webRequest.onErrorOccurred.addListener((details)=> {
      const { tabId, requestId } = details;
      if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
          return;
      }

      const request = tabStorage[tabId].requests[requestId];
      Object.assign(request, {
          endTime: details.timeStamp,           
          status: 'error',
      });
      console.log(tabStorage[tabId].requests[requestId]);
  }, networkFilters);

  chrome.tabs.onUpdated.addListener((tab) => {
      const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
      if (!tabStorage.hasOwnProperty(tabId)) {
          tabStorage[tabId] = {
              id: tabId,
              requests: {},
              registerTime: new Date().getTime(),
             
          };
          alert(tabId);
      //    localStorage.setItem("sessionID", "234425");
          alert(localStorage.getItem("sessionID"));
          
      //     $.getScript('content_script.js', function () {          
      //       getJSessionId();
      // });  
      }
  });
  chrome.tabs.onRemoved.addListener((tab) => {
      const tabId = tab.tabId;
      if (!tabStorage.hasOwnProperty(tabId)) {
          return;
      }
      tabStorage[tabId] = null;
  });
}());