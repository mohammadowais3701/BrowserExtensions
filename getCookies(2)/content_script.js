chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message=="RefreshAllTabs"){

        window.location.reload();

    }
    else{
    document.cookie = request.cooki;
}
 })
 function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + "" + ";" + expires + ";path=/";
  }