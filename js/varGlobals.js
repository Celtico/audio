
var screenWidth    = window.innerWidth;
var screenHeight   = window.innerHeight;
var video          = document.querySelector("#videoElement");
var video_element  = document.getElementById('videoElement');
var canvas         = document.getElementById('canvas');
canvas.setAttribute('width','29');
canvas.setAttribute('height','20');
var bulletSize     = 40;
var radius         = bulletSize / 2;
if(screenWidth < 700){
    canvas.setAttribute('width','10');
    canvas.setAttribute('height','7');
    bulletSize     = 36;
    radius         = bulletSize / 2;
}
var context        = canvas.getContext('2d');
var canvas_width   = canvas.width;
var canvas_height  = canvas.height;
var canvas2        = document.getElementById('canvas2');
var context2       = canvas2.getContext('2d');
var canvas_width2  = canvas2.width;
var canvas_height2 = canvas2.height;
var canvasVideo    = document.getElementById('canvasVideo');
var waveCanvas = document.getElementById('waveCanvas');
if(screenWidth < 700){
    canvasVideo.setAttribute('width','280');
    canvasVideo.setAttribute('height','180');
    waveCanvas.setAttribute('width','280');
    waveCanvas.setAttribute('height','130');
    canvas2.setAttribute('width','800');
    canvas2.setAttribute('height','600');
} else{
    canvas2.setAttribute('width',screenWidth * 2);
    canvas2.setAttribute('height',screenHeight * 2 );
}
var contextVideo   = canvasVideo.getContext('2d');
var cv_width       = canvasVideo.width;
var cv_height      = canvasVideo.height;
var CanvasVideoFrame = null;
var img            = document.getElementById('img');
var file           = document.getElementById("file");
var file_audio     = document.getElementById("file_audio");
var delta          = 8;
var imageData;
var isMicro = false;
var myAudioContext,
    myAudioAnalyser,
    SpectrumAnimationFrame = null,
    request,
    BANDPASS,
    source,
    spectrumType = 1,
    vel_espect = 0.95,
    value_hue = 0,
    value_saturation =  0,
    value_lightness = 0,
    transparencia = 1,
    duplicar = 0,
    clientIdSoundCloudId_client_id = 'f240950ceb38d793cf52508943c8dc3f';
