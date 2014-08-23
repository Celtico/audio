


//init: create plugin
window.addEventListener('load', function() {


    try {

        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
        myAudioContext =  new AudioContext();

        masterGain  =  myAudioContext.createGain();
        masterGain.connect(myAudioContext.destination);

        runningDisplayContext = document.getElementById("wavedisplay").getContext("2d");


        // leftTrack  = new p('https://api.soundcloud.com/tracks/102132606/stream'  + '?client_id=' + clientIdSoundCloudId_client_id,true,'a');

        leftTrack  = new p('https://api.soundcloud.com/tracks/140962704/stream'  + '?client_id=' + clientIdSoundCloudId_client_id,false,'b');
        rightTrack = new p('https://api.soundcloud.com/tracks/140962594/stream'  + '?client_id=' + clientIdSoundCloudId_client_id,false,'b');

        tracks = document.getElementById( "pContent" );
        updatePlatters( 0 );
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

        myAudioAnalyser = myAudioContext.createAnalyser();
        myAudioAnalyser.smoothingTimeConstant = vel_espect;
        myAudioAnalyser.fftSize = 2048;
        masterGain.connect(myAudioAnalyser);

        SpectrumAnimationStart();
        VideoAnimationStart();

        // Start initializing MIDI
        if (navigator.requestMIDIAccess)
            navigator.requestMIDIAccess().then( onMIDIInit, onMIDIFail );

    } catch(e) {
        console.log(e);
        alert('Este navegador no soporta la API de audio');
    }




});

function sliderChange(e){
    masterGain.gain.value = e.value;
}



var rafID = null;
var tracks = null;

function updatePlatters(time) {
    runningDisplayContext.clearRect(0,0,RUNNING_DISPLAY_WIDTH,RUNNING_DISPLAY_HEIGHT);
    for (var i=0; i<tracks.children.length; i++)
        tracks.children[i].p.updatePlatter( true );
    rafID = window.requestAnimationFrame( updatePlatters );
}


document.getElementById("close").addEventListener("click",function(){
    document.getElementById("nav").setAttribute('style','display:none');
    canvas2.setAttribute('style','margin-left:0; margin-top:0;');
}, false);
document.getElementById("open").addEventListener("click",function(){
    document.getElementById("nav").setAttribute('style','display:block');
    canvas2.setAttribute('style','margin-left:190px; margin-top: 17px;');
}, false);
