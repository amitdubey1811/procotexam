const fullscreenButton = document.getElementById('endbutton');




if (typeof document.hidden !== "undefined") {
    // Add a listener for the visibilitychange event
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            // Show the message when the user switches to a different tab or window
            window.alert("Please Do not switch tab during test.");
        }
    });
}


window.addEventListener("beforeunload", function (event) {
    // Cancel the event
    event.preventDefault();
    
    var confirmationMessage = "Are you sure you want to leave this page?";
    event.returnValue = confirmationMessage; 
    return confirmationMessage; 
});






const startbutton = document.getElementById('startbutton');


startbutton.addEventListener('click',
    () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { min: 50, max: 100 },
                height: { min: 40, max: 80 }
            },
            audio:true
        })
            .then(function (stream) {
                const videoElement = document.createElement('video');
                
                videoElement.muted=true;
                videoElement.srcObject = stream;
                document.body.appendChild(videoElement);

                var videodiv = document.getElementById('videodiv');
                videodiv.appendChild(videoElement);
                videoElement.play();

                var elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen()
                };

                var deldiv = document.getElementById('start');
                deldiv.remove();

                var newDiv = document.createElement("div");

                // Create a new button element
                const newButton = document.createElement("button");
                newButton.textContent = "End Test";
                newButton.style.backgroundColor='red';
                newButton.style.padding='15px';

                newButton.id='endtest';

                // Create a new p element
                var newParagraph = document.createElement("p");
                newParagraph.textContent = "click to end test";

                // Append the button and paragraph elements to the div
                newDiv.appendChild(newButton);
                newDiv.appendChild(newParagraph);

                var addiv=document.getElementById('end');
               
                addiv.appendChild(newDiv);
                 
               
                localStorage.setItem('Camera', 'Running');
                localStorage.setItem('Microphone', 'Running');

                const extensionId = chrome.runtime.id;
                document.getElementById('endtest').addEventListener("click", function() {
                chrome.management.setEnabled(extensionId, false);
                });    

            })
            .catch(function (error) {
                // Code to handle error accessing camera and microphone
                console.log(error);
                localStorage.setItem('Camera', 'Not Running');
                localStorage.setItem('Microphone', 'Not Running');

                alert('Access denied');
            });
    });

    
     
    //to store Ip address of the user in Local storage
      
    fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      
      localStorage.setItem('ipAddress', ipAddress);
    });

   
    
      

  

  if (navigator.onLine) {
    // User is online
    
    
    localStorage.setItem('Internet Connection','Connected');
     
  } else {
    // User is offline
     alert("Please Connect to internet to proceeD Test");
    localStorage.setItem('Internet Connection','Not Connected');
  }
    

  if (navigator.connection) {
    const connection = navigator.connection;
  
   
  
    // Check the estimated bandwidth
    const downlink = connection.downlink;
    localStorage.setItem("Estimated bandwidth (Mbps)",downlink);

  } else {
    alert("Please Connect to internet to proceeD Test");
    localStorage.setItem("Estimated bandwidth (Mbps)","Not Found");
  }


  // Check for multiple tabs
  // if 
  chrome.windows.getCurrent(function(currentWindow) {
    // Get all tabs in the current window
    console.log('current window');
    chrome.tabs.query({windowId: currentWindow.id}, function(tabs) {
      // If there is more than one tab, close all tabs except the first one
      if (tabs.length > 1) {
        for (var i = 1; i < tabs.length; i++) {
          chrome.tabs.remove(tabs[i].id);
          console.log('id');
        }
      }
    });
  });