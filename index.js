const fullscreenButton = document.getElementById('endbutton');

const flag = false;





if (typeof document.hidden !== "undefined") {
    // Add a listener for the visibilitychange event
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            // Show the message when the user switches to a different tab
            window.alert("Please Do not switch tab during test.");
        }
    });
}


window.addEventListener("beforeunload", function (event) {
    // Cancel the event
    event.preventDefault();
    // Display a confirmation dialog
    var confirmationMessage = "Are you sure you want to leave this page?";
    event.returnValue = confirmationMessage; // Gecko and Trident
    return confirmationMessage; // Gecko and WebKit
});


//  function removediv(){



//      flag=true;

//  }

if (flag) {

}


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
                 
                newButton.id='endtest';
                // Create a new p element
                var newParagraph = document.createElement("p");
                newParagraph.textContent = "click to end test";

                // Append the button and paragraph elements to the div
                newDiv.appendChild(newButton);
                newDiv.appendChild(newParagraph);

                var addiv=document.getElementById('end');
                // Append the div to the document body
                addiv.appendChild(newDiv);
                 
                // document.getElementById('endtest').addEventListener('click', () => {
                //     // Use the Chrome Extension API to disable the extension
                //     console.log('hello here');
                    
                //     location.reload(true);

                //   });

                const extensionId = chrome.runtime.id;
                document.getElementById('end').addEventListener("click", function() {
                chrome.management.setEnabled(extensionId, false);
                });    

            })
            .catch(function (error) {
                // Code to handle error accessing camera and microphone
                console.log(error);
                alert('Access denied');
            });
    });

    
    // document.getElementById('endtest').addEventListener('click', () => {
    //     // Use the Chrome Extension API to disable the extension
    //     console.log('hello here');
    //     chrome.management.setEnabled("hiognlmnbdoiicbdigfonpfpoicoijaj", false, () => {
    //       console.log('Extension disabled');
    //     });
    //   });
    //  Make sure to replace 'your-extension-id' with the actual ID of the extension you want to disable. Also, note that this code will only work in a Chrome extension or a web page that has been granted the necessary permissions to use the Chrome Extension API.
      
      
      
      
      

   

    