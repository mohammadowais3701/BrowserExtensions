
document.addEventListener('DOMContentLoaded', function () {
  let checker = document.getElementById('proxyCheckbox');
  let addManualChecker=document.getElementById('manualproxy');
  let vpnChecker=document.getElementById('VPNproxy');
  let sendbtn = document.getElementById('inputFile');
  let addproxybtn=document.getElementById('addproxy');
  addManualChecker.checked=String(true)==localStorage.getItem('manualProxy');
  checker.checked=String(true)==localStorage.getItem('proxyByFile');
  vpnChecker.checked=String(true)==localStorage.getItem('vpn');
  sendbtn.disabled = !checker.checked;
  checker.onchange = function() {
    sendbtn.disabled = !this.checked;
     localStorage.setItem('proxyByFile',!sendbtn.disabled);
     chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                         
      var message = {
       msg:"proxybyfile",
      }
      chrome.runtime.sendMessage({ message });
  });
  };
  addproxybtn.disabled=!addManualChecker.checked;
  addManualChecker.onchange = function() {
    addproxybtn.disabled = !this.checked;
     localStorage.setItem('manualProxy',! addproxybtn.disabled);

     chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                         
      var message = {
       msg:"singleproxy",
      }
      chrome.runtime.sendMessage({ message });
  });
  };




  vpnChecker.onchange = function() {
 
     localStorage.setItem('vpn',vpnChecker.checked);
     chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                         
      var message = {
       msg:"vpn",
      }
      chrome.runtime.sendMessage({ message });
  });



  };

  document.getElementById('inputFile').addEventListener('change', (event)=>{
              const input = event.target;
              const reader = new FileReader();
              reader.onloadend = () => {
                let proxies=(reader.result)
               
                let proxylist=proxies.split('\n');
                let proxies_collection=[];
                for (let index = 0; index < proxylist.length; index++) {
                  proxies_collection.push(proxylist[index].trim('\n').trim('\r').trim());
                  
                }
              
                localStorage.setItem("proxies",JSON.stringify(proxies_collection))
               
                chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                         
                          var message = {
                           msg:"proxyset",
                          }
                          chrome.runtime.sendMessage({ message });
                      });
              };
              reader.readAsText(input.files[0]);
        })
        document.getElementById('addproxy')
        .addEventListener('click', (event)=>{
          let proxies_collection=[];
          let  proxy = document.getElementById('singleProxy').value;
          let manaulProxyList=localStorage.getItem("manualProxies");
          
          if (proxy!=null) {
            if(manaulProxyList!=null)
            JSON.parse(manaulProxyList).forEach(element => {
            
              proxies_collection.push(element);
            });
            proxies_collection.push(proxy);
            localStorage.setItem("manualProxies",JSON.stringify(proxies_collection));
            chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                     
              var message = {
               msg:"singleproxy",
              }
              chrome.runtime.sendMessage({ message });
          });
          document.getElementById('singleProxy').value = null;
          }
            
          // };
          // reader.readAsText(input.files[0]);
    })
}, false);


// document.addEventListener('DOMContentLoaded', function () {
//   var checkPageButton = document.getElementById('tabcount_btn');
//   var tab_count;
//   var interval = 0;
//   var url;
//   checkPageButton.addEventListener('click', function (tab) {
//     tab_count = document.getElementById('tabcount').value;
//     interval = document.getElementById('interval').value;
//     if (tab_count != null) {
//       chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
//         url = tabs[0].url;
//         var message = {
//           tab_count,
//           interval,
//           url,
//         }
//         chrome.runtime.sendMessage({ message });
//     });
   
      
//     }
//     else {
//       alert("Enter Tab Count");

//     }
//   }, false);
// }, false);