
var dingbuffer = null;
var revdingbuffer = null;

function playSound(buffer) {
    var source =  myAudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(masterGain);
    source.noteOn(0);
}

function crossfade(value) {

    var gain1 = Math.cos(value * 0.5*Math.PI);
    var gain2 = Math.cos((1.0-value) * 0.5*Math.PI);
    rightTrack.xfadeGain.gain.value = gain1;
    leftTrack.xfadeGain.gain.value = gain2;
}

function logResponse( input ) {
    return ( Math.pow(2,((input*4)-1)) - 0.5)/7.5;
}

function cue(event) {

    var p = event.target.parentNode.p;
    if (p.cuePoint) {
        p.jumpToCuePoint();
    } else {
        p.setCuePointAtCurrentTime();
        event.target.classList.add("active");
    }
    event.preventDefault();
}

function preLoaderPista(elementText,elementOpacity,request){
    request.addEventListener('progress',function(event){

        var preload = Math.round(( event.loaded * 100  ) / event.total );

        elementText.innerHTML  = preload + '%';
        elementOpacity.setAttribute('style','opacity:0.1');

        document.getElementById("preload-in").setAttribute('style','width:'+ preload + '%;');
        document.getElementById("preload-in").innerHTML  = preload + '%';

    }, false);
}
function loadedPista(elementText,elementOpacity,nom){

    elementText.innerHTML  = nom;
    elementOpacity.setAttribute('style','opacity:1');

    document.getElementById("preload-in").innerHTML  = nom;
    document.getElementById("play").setAttribute('style','opacity:1');
}

