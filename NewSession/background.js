var Helpers =
{
    getHost: function (t) {
        var e = document.createElement("a"); return e.href = t, e.host
    },
    getUrlParameter: function (t, e) { for (var r = t.search.substring(1).split("&"), n = 0; n < r.length; n++) { var i = r[n].split("="); if (i[0] == e) return i[1] } }, getDomainName: function (t) { var e = t.split(".").reverse(); return 3 <= e.length && e[1].match(/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i) ? e[2] + "." + e[1] + "." + e[0] : e[1] + "." + e[0] },
    getDomainsList: function (t) {
        if (!t) return [];
        var e = t.split("\n"),
            r = {}; return e = e.filter(function (t) {
                return !!t && !r[t] && (r[t] = !0)
            })
    }
};
var App = function () {
    var f = { separator: "_@@@_" }, c = {}, u = {}, d = {},
        e = function () {
           // DuplicateTabsApp.isActive() || DuplicateTabsApp.init(), TimersApp.init(), RefreshAllApp.init(), PastiesApp.init(), CenturyViewApp.init()
        },
      
        l = function () {
            f.filter = Helpers.getDomainsList(localStorage.filter),
                chrome.tabs.query({}, function (e) {
                    for (var t = 0, n = e.length; t < n; t++) {
                        var i = e[t];
                        A(i.url, i.id) && b(i.id)
                    }
                })
        },
        n = function () {
            chrome.runtime.onMessage.addListener(function (e, t, n) {
                var i = e.cmd, r = e.data, a = (t.tab || {}).id;
                if ("update_settings" === i) l();
                else if ("get_settings" === i) A(t.tab.url, t.tab.id) ? (m(a, "on"), n({ settings: f, tabId: t.tab.id })) : m(a, "off");
                else if ("browserAction" === i) {
                    if (!Insomniac.getState().active) return; var o = r; chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) { var t = e[0]; d[o] && d[o](t) })
                } else {
                    if ("insomniac.activate" === i) return Insomniac.activate(r, function (e) {
                        n(e)
                    }), !0;
                    if ("insomniac.get_state" === i) n(Insomniac.getState());
                    else if ("insomniac.reset" === i) Insomniac.reset();
                    else if ("insomniac.open_i_tab" === i) {
                        var s = {}; r && r.url && (s.url = r.url), chrome.tabs.create(s, function (e) { c[e.id] = !0 })
                    }
                    else "insomniac.open_i_window" === i ? chrome.windows.create({ state: "maximized" }, function (e) {
                        u[e.id] = !0, e.tabs.map(function (e) { c[e.id] = !0 })
                    }) : "insomniac.add_domain" === i ? p(function (e) { e && e.url && v(e.url) }) : "clear_tab_cookies" === i && p(function (e) { b(e.id, function () { chrome.tabs.reload(e.id) }) })
                }
            })
        },

        i = function () { },
        r = function () {
            chrome.tabs.onCreated.addListener(function (e) { var t = e.windowId; u[t] && (c[e.id] = !0) }),
                chrome.tabs.onRemoved.addListener(function (e, t) { b(e), delete c[e] })
        },
        a = function () {
            chrome.windows.onRemoved.addListener(function (e) { delete u[e] })
        },
        p = function (n)
 {
            chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
                var t = e[0]; n(t)
            })
        },

        m = function (e, t) { "on" === t ? (chrome.browserAction.setBadgeBackgroundColor({ color: "#3a3", tabId: e }), chrome.browserAction.setBadgeText({ text: "On", tabId: e })) : (chrome.browserAction.setBadgeBackgroundColor({ color: "#aaa", tabId: e }), chrome.browserAction.setBadgeText({ text: "", tabId: e })) },
        v = function (e) {
            var t = Helpers.getHost(e); t = t.replace(/^www\./, ""), f.filter.push(t), localStorage.filter = f.filter.join("\n")
        },

        b = function (r, a) {
            chrome.cookies.getAll({}, function (e) {
                for (var t = 0, n = e.length; t < n; t++) {
                    var i = e[t]; -1 !== i.name.indexOf(r + f.separator) && chrome.cookies.remove({ url: o(i), name: i.name, storeId: i.storeId }, function (e) { a && a() })
                }
            })
        };

    function o(e) {
        var t = e.secure ? "https://" : "http://"; return "." == e.domain.charAt(0) && (t += "www"), t + e.domain + e.path
    }

    var s = function () { g(), h() },
        h = function () {
            chrome.webRequest.onHeadersReceived.addListener(function (n)
 {
                if (-1 !== n.tabId && A(n.url, n.tabId) && Insomniac.getState().active) {
                    var e = n.responseHeaders;
                    return e.forEach(function (e, t) {
                        "set-cookie" === e.name.toLowerCase() && (e.value = k(e.value, n.tabId))
                    }), { responseHeaders: e }
                }
            }, { urls: ["<all_urls>"] }, ["blocking", "responseHeaders"])
        },
        g = function () {
            chrome.webRequest.onBeforeSendHeaders.addListener(function (i) {
                if (A(i.url, i.tabId)) {
                    var e = i.requestHeaders; return e.forEach(function (e, t) {
                        if ("cookie" === e.name.toLowerCase()) { var n = I(e.value, i.tabId, i.url); e.value = n }
                    }), { requestHeaders: e }
                }
            }, { urls: ["<all_urls>"] }, ["blocking", "requestHeaders"])
        },
        A = function (e, t) {
            if (c[t]) return !0; for (var n = 0, i = f.filter.length; n < i; n++) {
                var r = f.filter[n];
                if (r) {
                    var a = !1;
                    if (w(e, r) && (a = !0), a) return !0
                }
            } return !1
        },
        w = function (e, t) {
            var n = !0;
            if (t.match(/^[.0-9a-zA-Z_-]+$/) && (n = !1), n) {
                var i = new RegExp(t, "i"); if (e.match(i)) return !0
            } else { if (-1 !== Helpers.getHost(e).indexOf(t)) return !0 } return !1
        },
        I = function (e, t, n) {
            for (var i = e.split("; "), r = [], a = 0, o = i.length; a < o; a++) {
                var s = i[a], c = s.indexOf("="), u = s.substr(0, c), d = s.substr(c + 1); 0 === u.indexOf(t + f.separator) && r.push(_(u) + "=" + d)
            } return res = r.join("; "), res
        },

        k = function (e, t) {
            return t + f.separator + e
        },
        _ = function (e) {
            var t = new RegExp("\\d+" + f.separator); return e.replace(t, "")
        };
    return {
        init: function () {
             l(), n(), r(), a(), s(), i(), e()
        },
      
    }
}();

App.init();