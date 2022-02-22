var tabs_hashes = {};
var tabs_hashes_save_queued = false;

function Start(){
    chrome.tabs.query({windowType: "normal"}, function(querytabs){
        querytabs.forEach(function(tab){
            tabs_hashes[tab.id] = GetHash(tab.url);
        });

        if (localStorage.getItem("tabs_hashes") !== null){

            var ref_load = JSON.parse(localStorage["tabs_hashes"]);
            var ref_tabId = {};


            querytabs.forEach(function(tab){
                for (var t = 0; t < ref_load.length; t++){
                    if (ref_load[t][1] === tabs_hashes[tab.id]){
                        ref_tabId[ref_load[t][0]] = tab.id;
                        ref_load.splice(t, 1);
                        break;
                    }
                }
            });

            // do what you have to do to convert previous tabId to the new one
            // just use ref_tabId[your_previous_tabId] to get the current corresponding new tabId
            console.log(ref_tabId);

        }
    });
}


function SaveHashes(){
    if (!tabs_hashes_save_queued && Object.keys(tabs_hashes).length > 0){
        tabs_hashes_save_queued = true;
        chrome.tabs.query({windowType: "normal"}, function(querytabs){
            var data = [];
            querytabs.forEach(function(tab){
                if (tabs_hashes[tab.id]){
                    data.push([tab.id, tabs_hashes[tab.id]]);
                } else {
                    data.push([tab.id, GetHash(tab.url)]);
                }
            });
            localStorage["tabs_hashes"] = JSON.stringify(data);
            setTimeout(function(){ tabs_hashes_save_queued = false; }, 1000);
        });
    }
}

function GetHash(s){
    var hash = 0;
    if (s.length === 0){
        return 0;
    }
    for (var i = 0; i < s.length; i++){
        hash = (hash << 5)-hash;
        hash = hash+s.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}


chrome.tabs.onCreated.addListener(function(tab){
    SaveHashes();
});
chrome.tabs.onAttached.addListener(function(tabId){
    SaveHashes();
});
chrome.tabs.onRemoved.addListener(function(tabId){
    delete tabs_hashes[tabId];
    SaveHashes();
});
chrome.tabs.onDetached.addListener(function(tabId){
    SaveHashes();
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
    if (changeInfo.pinned != undefined || changeInfo.url != undefined){
        delete tabs_hashes[tabId];
        SaveHashes();
    }
});
chrome.tabs.onMoved.addListener(function(tabId){
    SaveHashes();
});
chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId){
    delete tabs_hashes[removedTabId];
    SaveHashes();
});


Start();