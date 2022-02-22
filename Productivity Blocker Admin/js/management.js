
   document.addEventListener('DOMContentLoaded', function() {

    const firebaseConfig = {
        apiKey: "AIzaSyABS16L2JRWfiVSY0rPOso396KXkMAriaY",
        authDomain: "webblocking-90ed1.firebaseapp.com",
        projectId: "webblocking-90ed1",
        storageBucket: "webblocking-90ed1.appspot.com",
        databaseURL: "https://1:137451170006:web:c1a64e512a4f8a95180177.firebaseio.com",
        messagingSenderId: "137451170006",
        appId: "1:137451170006:web:c1a64e512a4f8a95180177",
        measurementId: "G-139QCECVXR"
      };
      var config = {
        apiKey: "AIzaSyABS16L2JRWfiVSY0rPOso396KXkMAriaY",
        databaseURL: "https://webblocking-90ed1-default-rtdb.firebaseio.com",
        storageBucket: "1:137451170006:web:c1a64e512a4f8a95180177.appspot.com"
       };
  
    
    
    let btnAddRow = document.getElementById('btn-add-row');
    let btnSave =document.getElementById('btn-save');
    let openModal=document.getElementById('btn-open-modal');
    let btnRemoveAll =document.getElementById('btnRemoveAll');
    
    btnAddRow.addEventListener("click",addTableRow);
    
    btnSave.addEventListener("click",Savedata);
    
    openModal.addEventListener('click',openModalBox);
    
    const app = firebase.initializeApp(config);
    const appDb = app.database().ref();
    let flag=false;
    var arrHead = new Array();	// array for header.
        arrHead = ['URL'];
    
        window.onload = (event) => {
            // alert("reload")
             createTable();
         };
         
         function createTable() {
   
            var URLS;
            var URLTable = document.createElement('table');
            URLTable.setAttribute('id', 'urltable'); // table id.
            URLTable.setAttribute('class','table');
            var tr = URLTable.insertRow(-1);
            for (var h = 0; h < arrHead.length; h++) {
                var th = document.createElement('th'); // create table headers
                th.innerHTML = arrHead[h];
                tr.appendChild(th);
            }
        
            var div = document.getElementById('cont');
            div.appendChild(URLTable);  // add the TABLE to the container.
         try{
            firebase.database().ref('URL/').on('value', (snapshot) => {
    
                URLS=JSON.parse(snapshot.val()["URL"]);
                
                if(URLS){
                    console.log("------",URLS)
                    appendURLTableRow(URLS);
                } 
              }, (errorObject) => {
                alert('The read failed: ' + errorObject.name);
              }); 
       //     URLS=JSON.parse(localStorage.getItem("URL"));
                    
        
         
            }
          catch(err){
            console.log(err)
        }
        }
        function addTableRow(){
            var empTab = document.getElementById('urltable');
        
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
     
            firebase.database().ref('URL/').set({
                URL:JSON.stringify([]),
                
              });
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
            var empTab = document.getElementById('urltable');
             empTab.deleteRow(e.target.parentNode.parentNode.rowIndex); // button -> td -> tr.
             var message = {
                msg:"removeNode",
               }
               chrome.runtime.sendMessage({ message });
    
             
         
      }
    
      function appendURLTableRow(data){
         if(!flag){
        var empTab = document.getElementById('urltable');
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
    
      function Savedata(){
     
        URLList=[];
    
        let urlRow= document.querySelectorAll('[id=urlrow]');
        let temp=[];
        urlRow.forEach(ele=>{
            ele.childNodes.forEach((td,index)=>{
                if(index==1){
                    return
                }
                temp.push(td.firstChild.value)
            })
            URLList.push(temp);
            temp=[];
        })
        console.log("===========")
        console.log(URLList);
    
    
       // localStorage.setItem("URL",JSON.stringify(URLList))
      flag=true;
      firebase.database().ref('URL/').set({
        URL:JSON.stringify(URLList),
        
      });
       
      
        $('#SaveModal').modal('show');
    
        console.log(URLList);
        chrome.tabs.query({currentWindow: true,'active': true, 'lastFocusedWindow': true,}, function (tabs) {
                     
            var message = {
             msg:"saveonLocalStorage",
            }
            chrome.runtime.sendMessage({ message });
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