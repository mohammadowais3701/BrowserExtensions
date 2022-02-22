var id_i;
  chrome.runtime.onStartup.addListener(function() {
  //  alert("Browser opened");
  chrome.management.getAll(function(info) {
    info.forEach(element => {
        if(element.name=='Login'){
            id_i=element.id;
          //  localStorage.setItem("id",element.id)
        }
    });
   
});
  localStorage.setItem("login","0");
      var id=2;
      chrome.tabs.update(id,{
        url: "login/login.html"
    });
    
    
    })
  

    chrome.tabs.onCreated.addListener(function(tab) {
    
     if(localStorage.getItem("login")=="0" || localStorage.getItem("login")==null){
          if(tab.title=="New Tab")
            chrome.tabs.update(tab.id, {
                url: "login/login.html"
            });
     }
 
    });
    chrome.runtime.onMessage.addListener((a,b,c)=>{
      chrome.tabs.remove(a.tab);
       })
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
       
            if (localStorage.getItem("login")=="0"||localStorage.getItem("login")==null) {
                return {redirectUrl: "chrome-extension://"+id_i+"/login/login.html"};
    
            }
            
        
        
    }, {
        urls: ["http://*/*", "https://*/*"],
      
    }, [
        'blocking'
    ]);

    // sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  // Usage!
  