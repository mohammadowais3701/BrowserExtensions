// var f = { separator: "_@@@_" ,filter:[],}, c = {}, u = {}, d = {}
// A = function (e, t) {
//     if (c[t]) return !0; for (var n = 0, i = f.filter.length; n < i; n++){
//          var r = f.filter[n]; 
//          if (r) { var a = !1;
//              if (w(e, r) && (a = !0), a) 
//              return !0 }
//              }
//               return !1
// }
// getHost= function (t) {
//     var e = document.createElement("a"); return e.href = t, e.host
// }
// p = function (n) {
//     chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) { var t = e[0]; n(t) })
// },
// v = function (e) {
//     var t = getHost(e);
//     t = t.replace(/^www\./, ""), f.filter.push(t), localStorage.filter = f.filter.join("\n")
// },
// n = function () {
//     chrome.runtime.onMessage.addListener(function (e, t, n) {
//         console.log(JSON.stringify(e));
//     })
// },




// w = function (e, t) {
//     var n = !0; 
//    if (t.match(/^[.0-9a-zA-Z_-]+$/) && (n = !1), n) {
//        var i = new RegExp(t, "i"); if (e.match(i)) return !0
//    } else { if (-1 !== getHost(e).indexOf(t)) return !0 } return !1
// }
// k = function (e, t) {
//     return t + f.separator + e
// }
// _ = function (e) {
//     var t = new RegExp("\\d+" + f.separator); return e.replace(t, "")
// }
// I = function (e, t, n) {
//     for (var i = e.split("; "), r = [], a = 0, o = i.length; a < o; a++){ var s = i[a], c = s.indexOf("="), u = s.substr(0, c), d = s.substr(c + 1); 0 === u.indexOf(t + f.separator) && r.push(_(u) + "=" + d) } return res = r.join("; "), res
// }
// a = function () {
//     chrome.windows.onRemoved.addListener(function (e) { delete u[e] })
// },
// function o(e) {
//     var t = e.secure ? "https://" : "http://"; return "." == e.domain.charAt(0) && (t += "www"), t + e.domain + e.path
// }
// b = function (r, a) {
//     chrome.cookies.getAll({}, function (e) {
//         for (var t = 0, n = e.length; t < n; t++){
//             var i = e[t]; -1 !== i.name.indexOf(r + f.separator) && chrome.cookies.remove({ url: o(i), name: i.name, storeId: i.storeId }, function (e) { a && a() })
//         }
//     })
// }
// chrome.webRequest.onCompleted.addListener(function (n){
//     alert("Completed");
//     p(function (e) { 
//         e && e.url && v(e.url) 
//     });



// },
// {urls: ["http://*/*", "https://*/*"]})
// chrome.webRequest.onHeadersReceived.addListener(function (n)
//  {
//                 if (-1 !== n.tabId && A(n.url, n.tabId))
//                 {
//                     var e = n.responseHeaders;
//                     return e.forEach(function (e, t) {
//                         "set-cookie" === e.name.toLowerCase() && (e.value = k(e.value, n.tabId))
//                     }), { responseHeaders: e }
//                 }
//             }, { urls: ["<all_urls>"] }, ["blocking", "responseHeaders"])

// chrome.webRequest.onBeforeSendHeaders.addListener(function (i) {
//                 if (A(i.url, i.tabId))
//                  { var e = i.requestHeaders; 
//                     return e.forEach(function (e, t)
//                      { if ("cookie" === e.name.toLowerCase()) 
//                      { var n = I(e.value, i.tabId, i.url);
//                          e.value = n } }), { requestHeaders: e } }
//             }, 
//             { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"])


//------------------------------------------------------
function m(value) {
    chrome.cookies.getAll({}, function (map) {
        var letter;
        for (letter in map) {
            var m = map[letter];
            var name = m.name;
            if (!(null === value && 0 < name.indexOf("@@@"))) {
                if (!("" === value && -1 === name.indexOf("@@@"))) {
                    if (!(value && name.substring(0, value.length) !== value)) {
                        chrome.cookies.remove({
                            url: (m.secure ? "https://" : "http://") + m.domain + m.path,
                            name: name
                        }, function () {});
                    }
                }
            }
        }
    });
  }
  var f = {};
  var g = [];
  var l = [];
  m("");
  
  var q;
  var n;
  var r;
  var s;
  var t;
  var u;
  var C;
  var D;
  var callback = function () {
      console.log("Cookie Removed!!!!!!!!!");
    };
  chrome.windows.onCreated.addListener(function() {
      alert("Browser opened");
      chrome.browsingData.remove({
          "since":(new Date()).getTime() - (1000 * 60 * 60 * 24 * 30)
          // "origins": ["https://stackoverflow.com/questions/55362438/calling-script-to-clear-cookies-on-specific-site-in-chrome-extension"]
       },
          {
            "appcache": true,
            "cache": true,
            "cacheStorage": true,
            "cookies": true,
            "downloads": true,
            "fileSystems": true,
            "formData": true,
            "history": true,
            "indexedDB": true,
            "localStorage": true,
            "passwords": true,
           // "serviceWorkers": true,
            "webSQL": true
          
        }, callback); 
      
      })
  

  function p(f, c) {
    if (c) {
      
        g[f] = c;
      
    }
  }
  function A(key) {
    if (!(1 > key)) {
//  return f[key] || !g[key] ? "" : g[key];
    return  !g[key] ? "" : g[key];
    }
  }
  chrome.tabs.onCreated.addListener(function (tab) {
    
    const tabId = tab.id;
    p(tabId, tabId + "_");
    
  
  
  
  });
  
  chrome.webRequest.onBeforeSendHeaders.addListener(function (data) {
    var key = data.tabId;
    var tabID=data.tabId;
    if (key && !(0 > key)) {
        var a = A(key);
        var url = data.url;
        var headers = data.requestHeaders;
        /** @type {string} */
        var c = "";
        if ("https://translate.googleapis.com/translate_static/img/loading.gif" !== url.substring(0, 65)) {
            if ("main_frame" === data.type) {
                /** @type {boolean} */
                f[key] = false;
                if (url && 0 === url.indexOf("https://accounts.google.com/")) {
                    var retValue;
                    var i;
                    for (i in headers) {
                        if ("Referer" === headers[i].name) {
                            retValue = headers[i].value;
                            break;
                        }
                    }
                    if (retValue) {
                        if (0 === retValue.indexOf("https://accounts.google.com/")) {
                            if (0 < retValue.indexOf("chrome.google.com")) {
                                /** @type {boolean} */
                                f[key] = true;
                                /** @type {string} */
                                a = "";
                            }
                        }
                    }
                }
                if (url) {
                    if (0 === url.indexOf("https://accounts.google.com/")) {
                        if (0 < url.indexOf("chrome.google.com")) {
                            /** @type {boolean} */
                            f[key] = true;
                            /** @type {string} */
                            a = "";
                        }
                    }
                }
                if (0 === url.indexOf("https://chrome.google.com/webstore")) {
                    /** @type {boolean} */
                    f[key] = true;
                    /** @type {string} */
                    a = "";
                }
            }
            for (i in headers) {
                if ("cookie" === headers[i].name.toLowerCase()) {
                    
                    if (!a && -1 === headers[i].value.indexOf("_")) {
                        return;
                    }
                    data = headers[i].value.split("; ");
                    var k;
                    for (k in data) {
                        key = data[k].trim();
                        
                        if(a.split('_')[0]!=key.substr(0,key.indexOf('_'))){
                           // alert("same")
                                continue;

                        }
                        if (0 < c.length) {
                            c += "; ";
                        }
                         console.log("a-------->"+a);
                         console.log("key------------>"+key);
                         console.log("c------>"+c);
                      c = a ? c + key.substring(a.length) : c + key;
                    }
                    headers.splice(i, 1);
                  
                  
                }
            }
            if (0 < c.length) {
                headers.push({
                    name: "Cookie",
                    value: c
                });
            }
           
           
            return {
                requestHeaders: headers
            };
        }//loading
    }
  }, {
    urls: ["http://*/*", "https://*/*"]
  }, ["blocking", "requestHeaders", "extraHeaders"]);
  

  
  chrome.webRequest.onHeadersReceived.addListener(function (data) {
    var key = data.tabId;
    if (key && !(0 > key)) {
        var val = A(key);
        if ("" !== val) {
            var url = data.url;
            data = data.responseHeaders;
     if ("https://translate.googleapis.com/translate_static/img/loading.gif" !== url.substring(0, 65)) {
              //if ("https://translate.googleapis.com/translate_static/img/loading.gif" !== url.substring(0, 65)) {
                var k;
                for (k in data) {
                    if ("set-cookie" === data[k].name.toLowerCase()) {
                        data[k].value = val + data[k].value;
                    }
                }
                return {
                    responseHeaders: data
                };
            }
        }
    }
  
  }, {
    urls: ["http://*/*", "https://*/*"]
  }, ["blocking", "responseHeaders", "extraHeaders"]);
  
  
  // chrome.tabs.onUpdated.addListener(function (i, dataAndEvents, jqXHR) {
  //   if ("loading" === jqXHR.status) {
  //       p(i, A(i));
  //   }
  // });
  chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    var tabId = details.tabId;
    if (!(!tabId || (0 > tabId || (!A(tabId) || 0 < details.frameId)))) {
        try {
            chrome.tabs.sendMessage(tabId, {
                type: 5
            });
        } catch (c) {}
    }
}, {
    urls: ["http://*/*", "https://*/*"]
});

  chrome.tabs.onRemoved.addListener(function (n) {
    a: {
        var val = A(n);
        if (val) {
            delete g[n];
            var key;
            for (key in g) {
                if (g[key] === val) {
                    break a;
                }
            }
            m(val);
        }
    }
    delete l[n];
  });
  