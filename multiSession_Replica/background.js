var f = {};
/** @type {Array} */
var g = [];
/** @type {Array} */
var l = [];
m("");

var q;
var n;
var r;
var s;
var t;
var u;


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
/**
 * @return {undefined}
 */
function z() {
    chrome.cookies.getAll({}, function (attrs) {
        var key;
        for (key in attrs) {
            var val = attrs[key].name;
            if (!(0 > val.indexOf("_@@@_"))) {
                for (key in val = val.substr(0, val.indexOf("_@@@_")) + "_@@@_", g) {
                    if (g[key] === val) {
                        return;
                    }
                }
            }
        }
    });
}
chrome.tabs.onReplaced.addListener(function (f, n) {
    var c = A(n);
    p(f, c);
    delete g[n];
   // B(f, c);
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
chrome.tabs.onUpdated.addListener(function (i, dataAndEvents, jqXHR) {
    if ("loading" === jqXHR.status) {
        p(i, A(i));
    }
});
var flag=0;
chrome.tabs.onCreated.addListener(function (c) {
console.log(JSON.stringify(c));
if(flag==0){
var file = "https://www.google.com/"
    chrome.tabs.create({

        url: file
    }, function (props) {
        p(props.id, props.id + "_@@@_");
    });
    flag=1;
    chrome.tabs.remove(c.id);
    setTimeout(() => {
        flag=0;  
    }, 100);
}
});

chrome.webRequest.onBeforeSendHeaders.addListener(function (data) {
    var key = data.tabId;
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
                    if (!a && -1 === headers[i].value.indexOf("_@@@_")) {
                        return;
                    }
                    data = headers[i].value.split("; ");
                    var k;
                    for (k in data) {
                        key = data[k].trim();
                        if (a) {
                            if (key.substring(0, a.length) !== a) {
                                continue;
                            }
                        } else {
                            if (-1 < key.indexOf("_@@@_")) {
                                continue;
                            }
                        }
                        if (0 < c.length) {
                            c += "; ";
                        }
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
        }
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
            if (!f[key] && "https://translate.googleapis.com/translate_static/img/loading.gif" !== url.substring(0, 65)) {
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


chrome.webRequest.onBeforeRequest.addListener(function (details) {
    var tabId = details.tabId;
    if (tabId && (!(0 > tabId) && A(tabId))) {
        return {
            redirectUrl: details.url.replace("https://mail.google.com/mail/ca/", "https://mail.google.com/mail/")
        };
    }
}, {
    urls: ["https://mail.google.com/mail/ca/*"]
}, ["blocking", "requestBody"]);


chrome.webRequest.onHeadersReceived.addListener(function (details) {
    var tabId = details.tabId;
    if (tabId && !(0 > tabId)) {
        return details.responseHeaders.push({
            name: "6",
            value: A(tabId)
        }), {
            responseHeaders: details.responseHeaders
        };
    }
}, {
    urls: ["https://translate.googleapis.com/translate_static/img/loading.gif"]
}, ["blocking", "responseHeaders"]);


chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (statement) {
        if (3 == statement.type) {
            if (port.sender.tab) {
                port.postMessage({
                    type: 4,
                    profile: A(port.sender.tab.id)
                });
            }
        }
    });
});


function A(key) {
    if (!(1 > key)) {
        return f[key] || !g[key] ? "" : g[key];
    }
}

function p(f, c) {
    if (c) {
      
        g[f] = c;
        
    }
}









