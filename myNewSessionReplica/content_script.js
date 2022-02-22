function s() {
    var content;
    /** @type {string} */
    content = "(" + function () {
        var ____t = document.title;
        var ce    = CustomEvent;
        document.__defineSetter__("title", function (t) {
            ____t = t;
            var e = new ce("9", {
                "detail": t
            });
            document.dispatchEvent(e)
        });
        document.__defineGetter__("title", function () {
            return ____t
        });
    } + ")()";
    /** @type {Element} */
    var script = document.createElement("script");
    script.appendChild(document.createTextNode(content));
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
}

function u(url) {
    if(n) {
        if(url.substr(0, n.length + 2) != "[" + n + "]") {
            /** @type {string} */
            document.title = "" + n + "_" + url;
        }
    } else {
        /** @type {string} */
        document.title = url;
    }
}
chrome.runtime.onMessage.addListener(function (statement) {
    if(5 == statement.type) {
        s();
       
        u(document.title);
    }
    if("3" == statement.type) {
        p("");
        /** @type {string} */
        document.title = document.title.replace(/\s*\[\d*\]\s*/g, "");
    }
});