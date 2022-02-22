
try {
    self.importScripts('firebase/firebase-app.js','firebase/firebase-database.js')
    const firebaseConfig = {
        apiKey: "AIzaSyABS16L2JRWfiVSY0rPOso396KXkMAriaY",
        authDomain: "webblocking-90ed1.firebaseapp.com",
        projectId: "webblocking-90ed1",
        storageBucket: "webblocking-90ed1.appspot.com",
        databaseURL: "https://1:137451170006:web:c1a64e512a4f8a95180177.firebaseio.com",
        messagingSenderId: "137451170006",
        appId: "1:137451170006:web:c1a64e512a4f8a95180177",
        measurementId: "G-139QCECVXR"
      };
      var config = {
        apiKey: "AIzaSyABS16L2JRWfiVSY0rPOso396KXkMAriaY",
        databaseURL: "https://webblocking-90ed1-default-rtdb.firebaseio.com",
        storageBucket: "1:137451170006:web:c1a64e512a4f8a95180177.appspot.com"
       };
    const app = firebase.initializeApp(config);
    const appDb = app.database().ref();
    const ref=firebase.database().ref('URL/') 
    
    
    let BlockWebsites=[];
    
    
    chrome.runtime.onStartup.addListener(function(c) {
    
       addURL();
    })
    
    
    
    chrome.onBeforeRequest.addListener(function (details) {  
        let flag=false;
        BlockWebsites.find(element=>{
            if(element.includes(details.url)||details.url.includes(element)||details.url==element){
                flag=true;
            }
        });
        if(flag){
          return {redirectUrl: 'http://productivityblocker.com/blocked'};
            // if(details.tabId>0){
            // chrome.tabs.update(details.tabId, {
            //     url: "http://productivityblocker.com/blocked"
            // });
        //}
        }
    }, {
            urls: ["http://*/*", "https://*/*"]
        }, ["blocking"]);
        chrome.runtime.onMessage.addListener((obj, sender, c) => {
            let tabId;
                if(obj.message.msg=="toggle"){
                    if(String(true)==localStorage.getItem("toggle")){
                       addURL();
                    }
                    else{
                        BlockWebsites.length=0;
                    }
                }
                else{
                addURL();
                }
          
        })
} catch (ex) {
    console.log(ex);
}


    function addURL() {
        BlockWebsites.length = 0;
        try {
            ref.on('value', (snapshot) => {
            var websites = JSON.parse(snapshot.val()["URL"]);    
            
            BlockWebsites=String(websites).split(",");
              }, (errorObject) => {
                alert('The read failed: ' + errorObject.name);
              }); 
        } catch (err) {
            console.log(err);
    
        }
    }