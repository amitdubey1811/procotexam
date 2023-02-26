const start=document.getElementById('start');

 start.onclick=function (){
    chrome.windows.create({
        url:"./index.html",
        type:"normal"
       
    });

    console.log('hello me');
 }



 //chrome.windows.create({url: "local.html", type: "popup"});