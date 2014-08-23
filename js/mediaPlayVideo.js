
/**
 * AUDIO AND VIDEO
 * DRAW VIDEO OR IMAGE
 * */
function playVideo() {

    context2.clearRect(0, 0, canvas_width2, canvas_height2);
    var freqRadius = radius;
    if(typeof myAudioAnalyser !== 'undefined'){
        var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
        if(spectrumType == 0){
            myAudioAnalyser.getByteTimeDomainData(freqByteData);
        }else{
            myAudioAnalyser.getByteFrequencyData(freqByteData);
        }
    }
    if(video_element.src != ''){
        context.drawImage(video_element,0,0,canvas_width,canvas_height);
    }
    for (var x = 0; x < (canvas_width); x++) {
        for (var y = 0; y < (canvas_height); y++) {
            imageData = context.getImageData(x, y,canvas_width,canvas_height);
            imageData = brightness(imageData);
            if(typeof myAudioAnalyser !== 'undefined'){
                var colorSum = imageData.data[0] + imageData.data[1] + imageData.data[2];
                freqRadius = (freqByteData[colorToFreq[colorSum]] * radius) / 150;
            }else{
                freqRadius = radius;
            }
            imageData = hueSat(imageData);
            var centerX = x * bulletSize + bulletSize / 2;
            var centerY = y * bulletSize + bulletSize / 2;
            forms(
                context2,
                centerY,
                centerX,
                "rgba(" + imageData.data[0] + ',' +  imageData.data[1]  + ',' +  imageData.data[2]  + ","+transparencia+")",
                freqRadius
            );


            if(duplicar > 0){

                forms(
                    context2,
                    centerY * duplicar,
                    centerX * duplicar,
                    "rgba(" + imageData.data[0] + ',' +  imageData.data[1]  + ',' +  imageData.data[2]  + ","+transparencia+")",
                    freqRadius * duplicar
                );
            }

        }
    }
    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    }
    CanvasVideoFrame = window.requestAnimationFrame( playVideo );
}
function VideoAnimationStart() {
    if (!CanvasVideoFrame) {
        playVideo();
    }
}
function VideoAnimationStop() {
    if (CanvasVideoFrame) {
        window.cancelAnimationFrame(CanvasVideoFrame);
        CanvasVideoFrame  = undefined;
    }
}
