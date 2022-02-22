var callback = function () {
    console.log("Cookie Removed!!!!!!!!!");
  };
chrome.windows.onRemoved.addListener(function(){

  localStorage.clear();
})
chrome.tabs.onActivated.addListener(function(activeInfo) {

chrome.browsingData.remove({
    "since":(new Date()).getTime() - (1000 * 60 * 60 * 24 * 7)
    // "origins": ["https://stackoverflow.com/questions/55362438/calling-script-to-clear-cookies-on-specific-site-in-chrome-extension"]
 },
    {
      "appcache": true,
      "cache": true,
      "cacheStorage": true,
      "cookies": true,
      "downloads": true,
      "fileSystems": true,
      "formData": true,
      "history": true,
      "indexedDB": true,
      "localStorage": true,
      "passwords": true,
     // "serviceWorkers": true,
      "webSQL": true
    
  }, callback); 


  if(localStorage.length > 0)
  {
      for (let i = 0; i < localStorage.length; i++) {

          var element = localStorage.key(i);
     console.log(activeInfo.tabId+"___"+element.includes(activeInfo.tabId));
          if(element.includes(activeInfo.tabId)){
          myCookie = localStorage.getItem(element);
        //  alert(myCookie);
          var msg = {
            message:"CookieSet",
            tabId:activeInfo.tabId,
            cooki:myCookie 
            };
            chrome.tabs.sendMessage(activeInfo.tabId,msg);

          }
          
      }
  }

  })
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  chrome.webRequest.onCompleted.addListener(
    
    function(details) {
     
    chrome.cookies.getAll({}, (cookies)=>{
  
    
      for (let index = 0; index < cookies.length; index++) {
      
        let url=("https://www."+((cookies[index].domain).replace('www.',''))).replace('..','.');
       
      
      console.log(JSON.stringify(cookies)); 
        var request = {

            domain: cookies[index].domain,
            name:cookies[index].name,
            value:cookies[index].value,
            expires:  cookies[index].expirationDate
        
                };
           
        var cookieBody = request.name+"="+request.value+"; domain="+request.domain+"; path=/; expires="+request.expires+"; secure;";
        var flag=1;
        var myVal=request.name+"="+request.value;
        
        for (let i = 0; i < localStorage.length; i++) {
          flag=1;
          var element = localStorage.key(i);
          myCookie = localStorage.getItem(element);
          var localCooki=myCookie.split(';')[0];
          if(localCooki==myVal){
          flag=0;
           break;
          }  
      }
         if(flag==1){
          localStorage.setItem(details.tabId+","+request.domain+","+request.name,cookieBody);
         }     
      }
      })
    },
    {urls: ["<all_urls>"]},
    ['extraHeaders','responseHeaders']
    )
