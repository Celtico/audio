
document.getElementById("webcam").addEventListener("click",webCam, false);
document.getElementById("micro").addEventListener("click",Micro, false);

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;


function audioError(e) { console.log(e); }
function videoError(e) { console.log(e); }

function webCam() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true,audio: false}, handleVideo, videoError);
    }
}
function Micro() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true,video: false}, handleAudio, audioError);
    }
}