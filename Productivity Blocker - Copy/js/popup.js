document.addEventListener('DOMContentLoaded', function() {
 let toggle=document.getElementById("fs");
toggle.checked=String(true)==localStorage.getItem('toggle')
 toggle.onchange=function () {
    
     localStorage.setItem('toggle',toggle.checked);   
     chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                       
        var message = {
         msg:"toggle",
        }
        chrome.runtime.sendMessage({ message });})
 }

})