document.addEventListener('DOMContentLoaded', function() {  
    var checkPageButton = document.getElementById('checkPage');  
    checkPageButton.addEventListener('click', function() {  
        chrome.tabs.getSelected(null, function(tab) {  
            d = document;  
            window.open('https://www.linkedin.com/in/mohammad-owais-27635119a', 'blank');  
        });  
    }, false);  
}, false);  