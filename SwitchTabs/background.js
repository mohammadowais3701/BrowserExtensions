Codes=[]
let index=0;
let TabIDs=[];
addCodes();
chrome.runtime.onStartup.addListener(function(c) {
    index=0;
    TabIDs=[]
    addCodes();
 })
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
   // alert(JSON.stringify(sender.tab.id))
if(msg.msg=="saveonLocalStorage")
addCodes();
else if(msg.msg=="script_loaded"){
    let mycode;
    
    if(index<Codes.length&&!TabIDs.includes(sender.tab.id)){
        mycode=Codes[index];
  
        index++;
        TabIDs.push(sender.tab.id);
        
    }
    else{
        mycode="No Code Available or code already applied"
    }
    sendResponse({"code":mycode})
}
    });
    
function addCodes() {
        Codes.length = 0;
        try {
            let myCodes = JSON.parse(localStorage.getItem("codes"));    
           
            Codes=String(myCodes).split(",");
        } catch (err) {
            console.log(err);
    
        }
    }
