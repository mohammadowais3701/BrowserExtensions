var e;
var k;
/** @type {null} */
var m = null;
var n;
try {
    k = chrome.runtime.connect({
        name: "3"
    });
    k.onMessage.addListener(function (props) {
        if(4 == props.type) {
            if("undefined" == props.profile) {
                window.location.reload();
            }
            p(props.profile);
        }
    });
    k.postMessage({
        type: "3"
    });
    k.onDisconnect.addListener(function () {});
} catch (q) {}

if(!k) {
    throw "port not found";
}
r();
function r() {
    var content;
    /**
     * @return {undefined}
     */
    content = function () {};
    /** @type {string} */
    content = "(" + function () {
        var ce = CustomEvent;
        document.__defineSetter__("cookie", function (c) {
            var event = new ce("7", {
                "detail": c
            });
            document.dispatchEvent(event)
        });
        document.__defineGetter__("cookie", function () {
            var event = new ce("8");
            document.dispatchEvent(event);
            var c;
            try {
                c = localStorage.getItem("@@@cookies");
                localStorage.removeItem("@@@cookies")
            } catch (e) {
                c = document.getElementById("@@@cookies").innerText
            }
            return c
        })
    } + ")()";
    /** @type {Element} */
    var script = document.createElement("script");
    script.appendChild(document.createTextNode(content));
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}

/**
 * @param {Object} s
 * @return {undefined}
 */
function p(s) {
    if(null !== s) {
        /** @type {Object} */
        m = s;
        n = m.substr(0, m.indexOf("_@@@_"));
    }
}

/**
 * @return {undefined}
 */
function t() {
    if(null === m) {
        /** @type {XMLHttpRequest} */
        e = new XMLHttpRequest;
        e.open("GET", "https://translate.googleapis.com/translate_static/img/loading.gif", false);
        e.send();
        /** @type {string} */
        var d = e.getResponseHeader(h);
        if(null !== d) {
            p(d);
        }
    }
}

document.addEventListener(7, function (e) {
    /** @type {number} */
    e = e.detail;
    t();
    document.cookie = null === m ? e : m + e.trim();
});

document.addEventListener(8, function () {
    t();
    var value;
    /** @type {string} */
    var c = document.cookie;
    /** @type {string} */
    value = "";
    if(c) {
        /** @type {Array.<string>} */
        c = c.split("; ");
        var d;
        for(d in c) {
            if(m) {
                if(c[d].substring(0, m.length) != m) {
                    continue;
                }
            } else {
                if(-1 < c[d].indexOf("_@@@_")) {
                    continue;
                }
            }
            if(value) {
                value += "; ";
            }
            value += m ? c[d].substring(m.length) : c[d];
        }
    }
    try {
        localStorage.setItem("@@@cookies", value);
    } catch (v) {
        if(!document.getElementById("@@@cookies")) {
            /** @type {Element} */
            d = document.createElement("div");
            d.setAttribute("id", "@@@cookies");
            document.documentElement.appendChild(d);
            /** @type {string} */
            d.style.display = "none";
        }
        /** @type {string} */
        document.getElementById("@@@cookies").a = value;
    }
});


// chrome.runtime.onMessage.addListener(function (statement) {
    
// console.log(JSON.stringify(statement))
//         if(statement.message=="CloseTab"){
//             console.log(statement.TabId);
//             window.close();

//         }
//         if(5 == statement.type) {
//             s();
//         }

    
// });
