chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
   // console.log(request.tabID+"--Message Background-> "+request.message);
//    if(request.message=="CookieRemove"){

//     if(localStorage.length > 0)
//     {
//         for (let i = 0; i < localStorage.length; i++) {
//             var element = localStorage.key(i);
//            console.log(request.tabId+"___"+element.includes(request.tabId));
//             if(element.includes(request.tabId)){
//             var arr = element;
//             console.log("coooooooooooooooooookie------"+element.split(',')[2]);
          
//             console.log("coooooooooooooooooookie------"+element.split(',')[2]);
//            // chrome.cookies.remove({url:"https://www"+element.split(',')[1],name:element.split(',')[2]});
//             chrome.runtime.sendMessage({type: "notification", options: { 
//                 url:("https://www."+element.split(',')[1]).replace('..','.'),
//                 name:element.split(',')[2]

//             }});
//          //   window.location.reload();
//         //    document.cookie=element.split(',')[2]+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
//             }
            
//         }
//         //location.reload(true);
//     }

// }
   if(request.message=="CookieSet"){

        if(localStorage.length > 0)
        {
            for (let i = 0; i < localStorage.length; i++) {
                var element = localStorage.key(i);
               console.log(request.tabId+"___"+element.includes(request.tabId));
                if(element.includes(request.tabId))
                document.cookie = localStorage.getItem(element);
                
            }
            //location.reload(true);
        }

    }
    else{
        var cookieBody = request.name+"="+request.value+"; domain="+request.domain+"; path=/; expires="+request.expires+"; secure;";
        console.log(request.tabID+"--Message Background-> "+cookieBody);
        localStorage.setItem(request.tabID+","+request.domain+","+request.name,cookieBody);
    }
 

})