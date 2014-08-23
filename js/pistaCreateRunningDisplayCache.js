
var MAX_CANVAS_WIDTH = 32000;   // limitation - can't draw canvases wider than 32k

function createRunningDisplayCache( buffer, isTop ) {
    var step = SECONDS_OF_RUNNING_DISPLAY * buffer.sampleRate / RUNNING_DISPLAY_WIDTH;
    var newLength = Math.floor( buffer.duration / SECONDS_OF_RUNNING_DISPLAY * RUNNING_DISPLAY_WIDTH );
    var data = buffer.getChannelData(0);
    var numCanvases = Math.ceil( newLength / MAX_CANVAS_WIDTH );
    var canvases = [];

//    newLength = Math.min(newLength, 32000   );

    // draw the canvas
    for (var j=0; j<newLength; j+=MAX_CANVAS_WIDTH) {
        // create canvas with width of the reduced-in-size buffer's length.
        var canvas = document.createElement('canvas');
        var width = newLength - j;
        canvas.width = (width>MAX_CANVAS_WIDTH) ? MAX_CANVAS_WIDTH : width;
        canvas.height = RUNNING_DISPLAY_HEIGHT;
        var drawCTX = canvas.getContext('2d');

        drawCTX.clearRect(0,0,newLength,RUNNING_DISPLAY_HEIGHT);
        // set the color for the waveform display
        drawCTX.fillStyle = isTop ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)";

        // draw the canvas
        for (var i=0; i<width; i++) {
            var max = 0.0;
            var offset = Math.floor((i+j)*step);
            for (var k=0; k<step; k++) {
                var datum = data[offset+k];
                if (datum < 0)
                    datum = -datum;
                if (datum > max)
                    max = datum;
            }
            max = Math.floor( max * RUNNING_DISPLAY_HEIGHT / 2 );
            if (isTop)
                drawCTX.fillRect(i,0,1,max);
            else
                drawCTX.fillRect(i,RUNNING_DISPLAY_HEIGHT,1,-max);
        }
        canvases.push( canvas );
    }
    return canvases;
}

