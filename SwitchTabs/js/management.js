
   document.addEventListener('DOMContentLoaded', function() {


    
    
    let btnAddRow = document.getElementById('btn-add-row');
    let btnSave =document.getElementById('btn-save');
    let openModal=document.getElementById('btn-open-modal');
    let btnRemoveAll =document.getElementById('btnRemoveAll');
    let startbtn=document.getElementById("start");
    
    btnAddRow.addEventListener("click",addTableRow);
    
    btnSave.addEventListener("click",Savedata);
    
    openModal.addEventListener('click',openModalBox);
  let Codes=[];
startbtn.addEventListener("click",start);

    let flag=false;
    var arrHead = new Array();	// array for header.
        arrHead = ['Codes'];
    
        window.onload = (event) => {
            // alert("reload")
             createTable();
         };
         
         function createTable() {
   
            var codes;
            var CodeTable = document.createElement('table');
            CodeTable.setAttribute('id', 'codestable'); // table id.
            CodeTable.setAttribute('class','table');
            var tr = CodeTable.insertRow(-1);
            for (var h = 0; h < arrHead.length; h++) {
                var th = document.createElement('th'); // create table headers
                th.innerHTML = arrHead[h];
                tr.appendChild(th);
            }
        
            var div = document.getElementById('cont');
            div.appendChild(CodeTable);  // add the TABLE to the container.
         try{
            
    
                codes=JSON.parse(localStorage.getItem("codes"));
                
                if(codes){
                    console.log("------",codes)
                    appendCodeTableRow(codes);
                } 
              
      
                    
        
         
            }
          catch(err){
            console.log(err)
        }
        }
        function addTableRow(){
            var empTab = document.getElementById('codestable');
        
            var rowCnt = empTab.rows.length;   // table row count.
            let tr = empTab.insertRow(rowCnt); // the table row.
            tr.setAttribute('id','urlrow');
            for (var c = 0; c <= arrHead.length; c++) {
                if(c==1){
                    var td = document.createElement('td'); // table definition.
                     td = tr.insertCell(c);
                    var ele = document.createElement('input');
                  
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('class','btn btn-danger');
                    ele.setAttribute('value','Remove');
                    ele.addEventListener('click',removeURLNode);
                    td.appendChild(ele);
                }
                else{
                    var td = document.createElement('td'); // table definition.
                    td = tr.insertCell(c);
                    var ele = document.createElement('input');
        
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('class','form-control');
                   ele.addEventListener('input',inputFieldListener)
                    td.appendChild(ele);
                }
                
                }
        }        
        function removeAll(){
              localStorage.removeItem("codes")
              var message = {
                msg:"removeAll",
               }
               chrome.runtime.sendMessage({ message });
            location.reload();
            console.log('deleting')
        }
        
    function openModalBox(){
        $('#Modal').modal('show');
        btnRemoveAll.addEventListener('click',removeAll);
    }
    
        function inputFieldListener(e){
         
            let val= e.target.value;
            e.target.setAttribute('value',val);
        }
        function removeURLNode(e){
            var empTab = document.getElementById('codestable');
             empTab.deleteRow(e.target.parentNode.parentNode.rowIndex); // button -> td -> tr.
             var message = {
                msg:"removeNode",
               }
               chrome.runtime.sendMessage({ message });
    
             
         
      }
    
      function appendCodeTableRow(data){
         if(!flag){
        var empTab = document.getElementById('codestable');
        let dt= new Array();
        dt=[...data];
    
        // the table row. 
    
        for (let c = 0; c < dt.length; c++) {
            let tr = empTab.insertRow();
            tr.setAttribute('id','urlrow');
            for(let i=0;i<dt[c].length+1;i++){
                if(i==1){
                var td = document.createElement('td'); // table definition.
                var ele = document.createElement('input');
                td = tr.insertCell(i);
                ele.setAttribute('type', 'text');
                ele.setAttribute('class','btn btn-danger')
                ele.setAttribute('value',"Remove")
                ele.addEventListener('click',removeURLNode)
                td.appendChild(ele);
                }else{
                var td = document.createElement('td'); // table definition.
                var ele = document.createElement('input');
                td = tr.insertCell(i);
                ele.setAttribute('type', 'text');
                ele.setAttribute('class','form-control')
                ele.setAttribute('value',dt[c][i]);
                ele.addEventListener('input',inputFieldListener)
                td.appendChild(ele);
                }
                
            }
            }
        }
        else{
            flag=false;
        }
    
    }
    function start(){
        alert("Program Started");
 
        
        let myCodes = JSON.parse(localStorage.getItem("codes"));    
        Codes=String(myCodes).split(",");
        startProgram();
        // for (let index = 0; index< Codes.length; index++) {
            
        //    // chrome.tabs.create({ url: "https://prontowin.coop-pronto.ch/de/raffle/play", active: true })
        //     min = Math.floor(Math.random() * 4)+2;
        //     do{
        //      secs=  Math.floor(Math.random() * 59)+1;
        //     }while(lastsecs==secs);
        //     lastsecs=secs;
        //     totaltime_secs=(min*60)+secs;
        //     console.log(totaltime_secs);
        //     setTimeout(()=>{chrome.tabs.create({ url: "https://prontowin.coop-pronto.ch/de/raffle/play", active: true })},(lastTotalTimeInsec+totaltime_secs)*1000)
        //     lastTotalTimeInsec=totaltime_secs;
        //    //  sleep(1000*totaltime_secs);
        //    // alert(totaltime_secs)
        // //    sleep(10*1000);
            
        // }
        
    }
let min,secs,totaltime_secs,today,time
function startProgram() {
	
    var nextExecutionTime = calc();
    chrome.tabs.create({ url: "https://prontowin.coop-pronto.ch/de/raffle/play", active: true })
   
    if(nextExecutionTime<Codes.length){
    
   			min = Math.floor(Math.random() * 4)+2;
            secs=  Math.floor(Math.random() * 59)+1;
            totaltime_secs=(min*60)+secs;
            
			 today = new Date();
			 time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			console.log(totaltime_secs)
           	console.log("DateTime--->"+time)
            setTimeout(startProgram,totaltime_secs*1000);
           
    }
}

let i = 1
function calc(){
return i++
}
  
      function Savedata(){
     
        codesList=[];
    
        let urlRow= document.querySelectorAll('[id=urlrow]');
        let temp=[];
        urlRow.forEach(ele=>{
            ele.childNodes.forEach((td,index)=>{
                if(index==1){
                    return
                }
                temp.push(td.firstChild.value)
            })
            codesList.push(temp);
            temp=[];
        })
        console.log("===========")
        console.log(codesList);
    
    
       // localStorage.setItem("URL",JSON.stringify(codesList))
      flag=true;
     
      localStorage.setItem("codes",JSON.stringify(codesList))
       
      
        $('#SaveModal').modal('show');
    
        console.log(codesList);
        chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {

            chrome.runtime.sendMessage({  msg:"saveonLocalStorage" });
        });
    
    
       }
       
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


   },false)