

 
document.addEventListener('DOMContentLoaded', function() {

  let formData = new FormData();
  //formData.append('url', 'https://www.nytimes.com/2022/01/12/us/politics/kevin-mccarthy-jan-6-committee.html');

  
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    console.log(tab.url);

    formData.append('url', tab.url);
    $.ajax({
      url: 'https://resoomer.pro/indexBrowsers.php',
      type: 'post',
      data: {url:tab.url},
      success: function(response){
        document.getElementById("pop").innerHTML="<p style='margin-left: 39px;'>"+response.summary+"</p>"+'<div ><center><a style="margin-left: 39px;" id="GoToResoomer" type="button" href="https://resoomer.com/?u='+tab.url+'" target="_blank">Continue on Resoomer</a></center><div>';
    
     
      }
      
    });
  
  
});

  // fetch("https://resoomer.pro/indexBrowsers.php",
  //     {
  //         body: formData,
  //         method: "post"
  //     }) .then(response => response)
  //               .then(response => {
  //                 alert(JSON.stringify(response))
  //                  document.getElementById("content").innerHTML=JSON.parse(response).summary;
  //               })
  //               .catch(error => alert(error));



 })