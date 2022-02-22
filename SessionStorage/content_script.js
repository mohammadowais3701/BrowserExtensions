var value1=1243;
var sessionIDs=[];

var jsId = window.document.cookie;//.match(/JSESSIONID=[^;]+/);
alert("aaaaaaaaaaaaa"+getJSessionId());
// chrome.browserAction.onClicked.addListener(function(tab) {
// // chrome.storage.local.set({[value1]: [value1]}, function() {
// // //  window.localStorage.setItem("key1", value1);  
    
// //   });
//   setTimeout(function(){ 
//     chrome.storage.local.get(['mykey'], function(result) {
    
//      alert(getJSessionId());
//     });
// },2000);  
  
// });
function getJSessionId(){
  var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
//  alert(jsId);
sessionIDs.push(jsId);
alert(localStorage.getItem("sessionID"));
localStorage.setItem("sessionID", "234412232125");  
  if(jsId != null) {
      if (jsId instanceof Array)
          jsId = jsId[0].substring(11);
      else
          jsId = jsId.substring(11);
  }
  return jsId;
}
