var flag=0;

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      var key,value;
   
  //     var element;
  //     var c = "";
  //     var headers =details.requestHeaders;
  //     for (i in headers) {

  //       if ("cookie" === headers[i].name.toLowerCase()) {
         
  //         for(var j=0;j<localStorage.length;j++){
  //          element = localStorage.key(j);
  //          if(details['tabId']==element.split(',')[0]){
  //           if(c.length>0){
  //             c+="; ";

  //           } 
  //          key=element.split(',')[2];
  //          value=localStorage.getItem(element);
  //         c+=key+"="+value;
  //         }

          

  //         }
  //         break;
  //          // headers.splice(i, 1);
           
  //       }
  //   }
  //   if (0 < c.length) {
  //     headers.push({
  //         name: "Cookie",
  //         value: c
  //     });
  // }
      for (var i = 0; i < details.requestHeaders.length; i++) {
         
        if (details.requestHeaders[i].name.toLowerCase() === "cookie") {
          // console.log(details.requestHeaders[i].value);
        
          var all_cookies=details.requestHeaders[i].value.split("; ");
        
         //console.log(all_cookies);
         try {
          var element;
          for(var k=0;k<all_cookies.length;k++){
            // console.log(all_cookies[k]);
            flag=0;
            var checkKey=0;
             key=(all_cookies[k].substring(0,all_cookies[k].indexOf('=')));
             value=all_cookies[k].substring(all_cookies[k].indexOf('=')+1);
             
             for(var j=0;j<localStorage.length;j++){
              element = localStorage.key(j);
              console.log("element.split(',')[0]----------------"+element.split(',')[0]);
              console.log("tabId----"+(details['tabId']));
              console.log("element.split(',')[2]----------------"+element.split(',')[2]);
              console.log("key----------------"+key);
              if(element.split(',')[2]==key.trim()){
                checkKey=1;
                break;
              }
             }
          if(checkKey==1){
           for(var j=0;j<localStorage.length;j++){
            flag=0;
            element = localStorage.key(j);
    
           if(element.split(',')[0]==(details['tabId'])&&element.split(',')[2]==(key.trim())){
                   
                   myCookie = key+"="+localStorage.getItem(element);
                   all_cookies[k]=myCookie;
                   flag=1;
                 alert("element.split(',')[2]----------------"+element.split(',')[2]);
                 alert("key----------------"+key);
                  break;
                 
                  
                  
           }
           else{
            all_cookies[k]="";


           }
          
          //  if(element.split(',')[2]==(key.trim())){
          //   flag=1;
          //   break;

          //  }
            
           }
          }
          else{
            flag=1;

          }
           if(flag==0){
            // alert("In flag------>"+flag);
            all_cookies[k]="";

           }
         } 
         } catch (error) {
          console.log("ERROR------------->"+error);
         }

     //   console.log("  --------->"+details.requestHeaders[i].value);
        details.requestHeaders[i].value="";
    
        all_cookies.forEach(element => {
          details.requestHeaders[i].value+=element+"; ";
        });
    //   console.log(" After adding Updated Cooki --------->"+details.requestHeaders[i].value);
        //break;
        }
  
      }
      return { requestHeaders:  details.requestHeaders };
    },  
    {urls: ['<all_urls>']},
    ['blocking', 'extraHeaders' ,'requestHeaders'  ]
   
  );
  chrome.webRequest.onHeadersReceived.addListener(

    function(details) {
   
      var cooki=""
      var domain="";
      var key=""
      var value=""
      const regxp=/domain=.*?;|domain=.*|Domain=.*?;|Domain=.*/g
  console.log(JSON.stringify(details['responseHeaders']));
      for(var i=0;i<(details['responseHeaders'].length);i++){
         try {
          if(details['responseHeaders'][i].name.toLowerCase()=="set-cookie"){
            // console.log(details['responseHeaders'][i].value);
        
            //  cooki+=","+JSON.stringify(details['responseHeaders'][i].value).split(';')[0];
                cooki=JSON.stringify(details['responseHeaders'][i].value).split(';')[0];
                console.log("Set-Cookie----"+cooki);
                key=(cooki.substring(0,cooki.indexOf('='))).slice(1,);
                value=cooki.substring(cooki.indexOf('=')+1);
              if(domain=="" || String(String(details['responseHeaders'][i].value).match(regxp))!="" )  
              domain=String(String(details['responseHeaders'][i].value).match(regxp));
              console.log("key----"+key+"---value--"+value+"--domain--"+domain);
              if(cooki!="" && domain !="null")
              localStorage.setItem(JSON.stringify(details['tabId'])+","+domain.split('=')[1].replace(';','')+","+key,value);
            }
         } catch (error) {
           console.log("ERROR------------->"+error);
         }
         

       }
    
      //  if(cooki!="" && domain !="null")
      //   localStorage.setItem(JSON.stringify(details['tabId'])+","+domain.split('=')[1].replace(';',''),cooki.slice(1,));
     
    },
    
    {urls: ["<all_urls>"]},
    ['blocking','extraHeaders','responseHeaders']
  );

  // chrome.webRequest.onCompleted.addListener(
    
  //   function(details) {
  //     for (let i = 0; i < localStorage.length; i++) {

  //             var element = localStorage.key(i);
        
  //             if(element.includes(details.tabId)){
  //               localStorage.removeItem(element);
  //               console.log("Removed from local Storage");
  //             }
              
  //         }
  //   chrome.cookies.getAll({}, (cookies)=>{
  
    
  //     for (let index = 0; index < cookies.length; index++) {
      
  //       let url=("https://www."+((cookies[index].domain).replace('www.',''))).replace('..','.');
       
      
  //     console.log(JSON.stringify(cookies)); 
  //       var request = {

  //           domain: cookies[index].domain,
  //           name:cookies[index].name,
  //           value:cookies[index].value,
  //           expires:  cookies[index].expirationDate
        
  //               };
           
  //  //     var cookieBody = request.name+"="+request.value+"; domain="+request.domain+"; path=/; expires="+request.expires+"; secure;";
  //  var cookieBody = request.value;
  //       var flag=1;
  //     //  var myVal=request.name+"="+request.value;
        
  //       for (let i = 0; i < localStorage.length; i++) {
  //         flag=1;
  //         var element = localStorage.key(i);
  //         myCookie = localStorage.getItem(element);
  //         var localCooki=myCookie;
  //         if(localCooki==cookieBody){
  //         flag=0;
  //          break;
  //         }
        
          
  //     }
  //        if(flag==1){
  //         localStorage.setItem(details.tabId+","+request.domain+","+request.name,cookieBody);
  //        }
        
  //     }
     
      
  //     })
   
  //   },
  //   {urls: ["<all_urls>"]},
  //   ['extraHeaders','responseHeaders']
  //   )

