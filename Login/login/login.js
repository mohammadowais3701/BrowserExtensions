// Future JavaScript will go here
document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('log');
    var name;
    var password;
    checkPageButton.addEventListener('click', function(tab) {
        email=document.getElementById('email').value;
        password=document.getElementById('password').value;
      
     if(email=="test@gmail.com" && password=="test"){
       
            localStorage.setItem("login","1");
         
         
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var tab=tabs[0].id;
                chrome.runtime.sendMessage({tab});
            });
          
            window.open("https://www.google.com");
         
        
        }
       else{
           
        alert("Wrong User email Password");

       } 
    //   chrome.tabs.getSelected(null, function(tab) {
    //     alert("Hello..! It's my first chrome extension.");
    //   });
    }, false);
  }, false);