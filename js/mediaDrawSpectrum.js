
/**
 * AUDIO
 * DRAW ESPECTRUM
 * */
function drawSpectrum() {

    var canvas = document.querySelector('#waveCanvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var bar_width = 2;
    var bar_width_next = 1;
    if(screenWidth < 700){
        bar_width = 15;
        bar_width_next = 14;
    }
    ctx.clearRect(0, 0, width, height);
    var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
    if(spectrumType == 0){
        myAudioAnalyser.getByteTimeDomainData(freqByteData);
    }else{
        myAudioAnalyser.getByteFrequencyData(freqByteData);
    }
    var barCount = Math.round(width / bar_width);
    for (var i = 0; i < barCount; i++) {
        var magnitude = freqByteData[i];
        ctx.fillRect(bar_width * i, height, bar_width - bar_width_next, - magnitude + 130);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
    }
    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    }
    SpectrumAnimationFrame = window.requestAnimationFrame( drawSpectrum );
}
function SpectrumAnimationStart() {
    if (!SpectrumAnimationFrame ) {
        drawSpectrum();
    }
}
function SpectrumAnimationStop() {
    if (SpectrumAnimationFrame) {
        window.cancelAnimationFrame(SpectrumAnimationFrame);
        SpectrumAnimationFrame  = undefined;
    }
}

function spectrumChange(){
    if(spectrumType == 0){
        spectrumType = 1;
        document.getElementById('velEsp').setAttribute('style','display:block');
    }else if(spectrumType == 1){
        spectrumType = 0;
        document.getElementById('velEsp').setAttribute('style','display:none');
    }
}
function velSpectrumChange(e){
    vel_espect  = e.value * 0.01;
    myAudioAnalyser.smoothingTimeConstant = vel_espect;
}