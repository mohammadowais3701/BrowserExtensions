chrome.tabs.onActivated.addListener(function(activeInfo) {
  //window.location.reload();
 
chrome.cookies.getAll({}, (cookies)=>{

for (let index = 0; index < cookies.length; index++) {
 // alert("length=--"+cookies[0].domain)
  let url=("https://www."+((cookies[index].domain).replace('www.',''))).replace('..','.');
  // alert(url);
  // alert(cookies[index].name);
 chrome.cookies.remove({"url": url, "name": cookies[index].name}, function(deleted_cookie) { alert(JSON.stringify(deleted_cookie)); });
  
}

})
//chrome.cookies.remove({"url": 'https://stackoverflow.com', "name": 'acct'}, function(deleted_cookie) { alert(JSON.stringify(deleted_cookie)); });
    // chrome.cookies.getAll({url:"https://www.linkedin.com/"}, function(cookies){
      var msg = {
       
        message:"CookieRemove",
        tabId:activeInfo.tabId
          
        };
        chrome.tabs.sendMessage(activeInfo.tabId,msg);
    //  chrome.cookies.remove({url:"https://www"+element.split(',')[1]});
      var msg = {
       
           message:"CookieSet",
           tabId:activeInfo.tabId
             
           };
           chrome.tabs.sendMessage(activeInfo.tabId,msg);
           console.log(activeInfo.tabId);
          chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            console.log(activeInfo);
            console.log(tabs);
            chrome.cookies.onChanged.addListener(function(ta) {
               obj=JSON.parse(JSON.stringify(ta))
             console.log("Active Info==>"+obj['cookie']['domain']);
              obj['cookie']['expirationDate']= (new Date(obj['cookie']['expirationDate']  *1000)).toGMTString();
             if(tabs[0].url.includes(obj['cookie']['domain'].slice(1))){
             var msg = {
          //  message:JSON.stringify(obj['cookie']),
          //  //    message:"",
          //       tabID: tabs[0].id,
          //       domain:obj['cookie']['domain'],
          //       url:tabs[0].url,
          //       name:obj['cookie']['name']
          message: JSON.stringify(obj['cookie']),
          tabID: tabs[0].id,
          domain: obj['cookie']['domain'],
          url: tabs[0].url,
          name: obj['cookie']['name'],
          value:obj['cookie']['value'],
          expires:    obj['cookie']['expirationDate']
              };
              chrome.tabs.sendMessage(tabs[0].id,msg);
              console.log(activeInfo.tabId);
            }
            })
          });
    // })



})
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // if (request.type == "worktimer")
  //   chrome.notifications.create('worktimer-notification', request.options, function() { });
  console.log("Content Script--->"+request.options.name)
  console.log("Content Script--->"+request.options.url)
 // chrome.cookies.remove({"url":request.options.url,"name":});
 //if(!request.options.name==undefined)
//  chrome.cookies.get({ url: request.options.url, name: request.options.name }, function (cookie){
//             alert(cookie.value);
//         });
 // chrome.cookies.remove({"url": request.options.url, "name": request.options.name}, function(deleted_cookie) { alert(deleted_cookie); });
  // alert("cookie_removed")
  //sendResponse();
});
// chrome.tabs.onUpdated.addListener(function(activeInfo) {
//     // chrome.cookies.getAll({url:"https://www.linkedin.com/"}, function(cookies){

//         chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//             console.log("Updated--->"+tabs[0]);
//           });
//     // })



// })