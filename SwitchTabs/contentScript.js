chrome.runtime.sendMessage({  msg:"script_loaded" },function(response) {
    console.log(response.code);
    // let min;
    // let secs;
    // let lastsecs;
    // let totaltime_secs;
    if(response.code!="No Code Available or code already applied"){
    document.getElementById("edit-raffle-code").value=response.code
    document.getElementById("edit-raffle-salutation-herr").click();
    document.getElementById("edit-raffle-firstname").value="Mirjam";
    
    document.getElementById("edit-raffle-lastname").value="Ruegg";
    
    document.getElementById("edit-raffle-mail").value="selim.meier12@gmail.com";
    sleep(500);
    document.getElementById("edit-raffle-newsletter-e-mail").click();
    sleep(500);
    document.getElementById("edit-raffle-terms-ja").click();
   sleep(3000);
   // 
  //  min = Math.floor(Math.random() * 4)+1;
  //  do{
  //   secs=  Math.floor(Math.random() * 59)+1;
  //  }while(lastsecs==secs);
  //  lastsecs=secs;
  //  totaltime_secs=(min*60)+secs;
  //  console.log(totaltime_secs);
  //   sleep(1000*totaltime_secs);
  
  document.getElementById("edit-submit").click();
   // alert("submit");
    
}
  });



  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}