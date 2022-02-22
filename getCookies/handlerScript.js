chrome.tabs.onActivated.addListener((tab) => {
    
    const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
   chrome.cookies.getAll({url:"https://www.linkedin.com/"}, function(cookies){
     //  alert(JSON.stringify(cookies));
  
      //const regxp=/domain/g
    const regxp=/\"domain\":\".*?\"|\"name\":\".*?\"|\"value\":\".*?\"\"|\"path\":\".*?\"|\"secure\":\".*?\"|\"httpOnly\":.*?,|\"path\":\".*?\"|\"secure\":.*?,|\"expirationDate\":.*?,|\"domain\":\".*?\"|\"storeId\":\".*?\"/g
     for(var k=0;k<localStorage.length;k++){
     //  obj=JSON.parse(localStorage.getItem(i));
      obj=JSON.parse(JSON.stringify((localStorage.getItem(k))));
 //   alert(String(obj));
      // chrome.cookies.set(localStorage.getItem(i))
      const arr=[...(String(obj)).matchAll(regxp)];
      
      mystr="\"url\":\"https://www.linkedin.com\",";
      for(var m =0; m<arr.length;m++){
        mystr=mystr+arr[m]+",";

      }
     mystr=mystr.replace(/,,/g,",").slice(0,-1);
     obj=JSON.parse('{'+mystr+'}')
      alert(JSON.stringify(obj))
    //  localStorage.clear();
     //chrome.cookies.set({"name": obj['name'],"url": "https://www.linkedin.com/","value": obj['value'],'path':obj['path']});
   // chrome.cookies.set(obj);
     //   chrome.cookies.set({"name": obj['name'],"url": obj['url'],"value":obj['value'],'domain':['domain'],'path':['path'],'secure':obj['secure'],'httpOnly':obj['httpOnly'],'expirationDate':['expirationDate']});
  
     }
  
 
     // alert(cook);
   });
     // alert(tabId)
     // chrome.cookies.set({"name": "Sample1","url": "https://www.linkedin.com/","value": "Dummy Data"});    
    
})
