const start = document.getElementById('start');


const currtime=new Date();
const currhr=currtime.getHours();
const currmin=currtime.getMinutes();

console.log( currmin);

const stesthr=15;
const stestmin=00;

const etesthr=15;
const etestmin=40;


const arr = ["https://codeforces.com/", "chrome://extensions/", "https://www.codechef.com/","https://github.com/"];

var url;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Get the active tab
    const activeTab = tabs[0];

    // Get the URL of the active tab
    url = activeTab.url;

    // Do something with the URL
    console.log(url);
});



var flag=true;

start.onclick = function () {


    for (var i = 0; i < arr.length; i++) {
        var currenturl = arr[i];

        if (currenturl === url &&(currhr>=stesthr&&currhr<=etesthr)&&(currmin>=stestmin&&currmin<=etestmin)) {



            flag=false;

            chrome.windows.create({
                url: "./index.html",
                type: "normal"

            });


            console.log('hello me');
        }

    }

    if(flag)
    alert("Not a valid Website or Test is not Started");

}

 //chrome.windows.create({url: "local.html", type: "popup"});