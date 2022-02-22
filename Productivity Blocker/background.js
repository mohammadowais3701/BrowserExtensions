let BlockWebsites=[];
let Rules=[];

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
    
    
 
    
    chrome.runtime.onStartup.addListener(function(c) {
    
       addURL();
        addRules();

    })
    
    
    
    // chrome.onBeforeRequest.addListener(function (details) {  
    //     let flag=false;
    //     BlockWebsites.find(element=>{
    //         if(element.includes(details.url)||details.url.includes(element)||details.url==element){
    //             flag=true;
    //         }
    //     });
    //     if(flag){
    //       return {redirectUrl: 'http://productivityblocker.com/blocked'};
    //         // if(details.tabId>0){
    //         // chrome.tabs.update(details.tabId, {
    //         //     url: "http://productivityblocker.com/blocked"
    //         // });
    //     //}
    //     }
    // }, {
    //         urls: ["http://*/*", "https://*/*"]
    //     }, ["blocking"]);
        chrome.runtime.onMessage.addListener((obj, sender, c) => {
            let tabId;
                if(obj.message.msg=="toggle"){
                    chrome.storage.local.get("toggle",(result)=>{
                     //   console.log(JSON.stringify(result))
                   //  console.log()
                    if(true==result.toggle){
                        console.log(true==result.toggle)
                       addURL();
                       addRules();
                    }
                    else{
                    
                        let arr=[]
                        for (let index = 1; index <= BlockWebsites.length; index++) {
                            arr.push(index.toString())
                            
                        }
                        console.log(arr)
                        // chrome.declarativeNetRequest.updateEnabledRulesets(
                        //     {disableRulesetIds:arr}
                             
                        //    )
                        BlockWebsites.forEach((domain, index) => {
                            let id = index + 1;
                        
                            chrome.declarativeNetRequest.updateDynamicRules(
                               {
                                 removeRuleIds: [id]
                               },
                            )
                        })
                    BlockWebsites.length=0;
                        }

                    })
                    // if(String(true)==localStorage.getItem("toggle")){
                    //    addURL();
                    // }
                    // else{
                    //     BlockWebsites.length=0;
                    // }
                }
                else{
                addURL();
                addRules()
                }
          
        })



    function addURL() {
        BlockWebsites.length = 0;
        try {
            ref.on('value', (snapshot) => {
            var websites = JSON.parse(snapshot.val()["URL"]);    
            
            BlockWebsites=String(websites).split(",");
              }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
              }); 
        } catch (err) {
            console.log(err);
    
        }
        console.log(BlockWebsites)
    }
    //productivityblocker.com/blocked
    function  addRules() {
        setTimeout(() => {
            BlockWebsites.forEach((domain, index) => {
                let id = index + 1;
            
                chrome.declarativeNetRequest.updateDynamicRules(
                   {addRules:[{
                      "id": id,
                      "priority": 1,
                      "action": { "type": "redirect", "redirect": { "url": "https://www.productivityblocker.com/blocked" } },
                      "condition": {"urlFilter": domain, "resourceTypes": ["main_frame"] }}
                     ],
                  
                   },
                )
            })
        //     let rule;
        //  for (let index = 0; index < BlockWebsites.length; index++) {
        //      rule={
        //          "id":index+1,
        //          "priority":1,
        //          "action": {
        //              "type": "redirect",
        //              "redirect": {
        //                "transform": { "scheme": "http", "host": "http://productivityblocker.com/blocked" }
        //              }
                     
        //            },
        //            "condition": { "urlFilter": "https://docs.google.com/", "resourceTypes": ["main_frame"] }
        //      }
        //      Rules.push(rule)
             
        //  }
        //  chrome.declarativeNetRequest.updateDynamicRules(
        //     {addRules:Rules,removeRuleIds: [id]},
        //      ()=>{}
        //    )
        }, 1000);
    }