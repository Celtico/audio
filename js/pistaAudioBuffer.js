

    /**
     * Load audio
     * @param url
     */
    p.prototype.loadP = function(url) {

        var this_ = this;
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
            this_.audioBuffer(request.response);
        };
        request.send();
        preLoaderPista(this_.nameElement,this_.cBuffer,request);
    };


    /**
     * Load audio in buffer
     * @param data
     */
    p.prototype.audioBuffer = function (data){

        var this_ = this;
        if(myAudioContext.decodeAudioData) {

            myAudioContext.decodeAudioData(data, function(buffer) {
                this_.buffer = buffer;
                this_.onLoadAudioBuffer();
            }, function() {
                alert("Decoding the audio buffer failed");
            });
        }
        else
        {
            this_.buffer = myAudioContext.createBuffer(data,false);
            this_.onLoadAudioBuffer();
        }
    };



    /**
     * on Load audio in buffer
     */
    p.prototype.onLoadAudioBuffer = function() {


        this.revBuffer = reverseBuffer( this.buffer );
        this.trackElement.classList.remove( "loading" );
        this.lastBufferTime = 0.0;
        for (var i=0; i<4; i++){
            this.cues[i] = null;
        }
        var this_ = this;
        loadedPista(this_.nameElement,this_.cBuffer,this_.nomPiesta);
        this.drawAudioBuffer(this_.cPista.width, this_.cPista.height,this_.cPista.getContext("2d"), this_.buffer);
        this.nameElement.innerHTML += " (" + this.buffer.duration.toFixed(1) + " sec)";
        this.waveformDisplayCache = createRunningDisplayCache( this.buffer, this.active );
        drawRunningDisplay(runningDisplayContext, this.waveformDisplayCache, this.lastBufferTime );
    };



    /**
     *  draw audio in buffer
     */
    p.prototype.drawAudioBuffer = function(width,height,cxt,buffer){
        var data = buffer.getChannelData( 0 );
        var step = Math.floor( data.length / width );
        var amp  = height / 2;
        cxt.clearRect(0,0,width,height);
        cxt.fillStyle = "rgba(0,0,0,0.3)";
        for(var i=0; i < width; i++){
            var min = 1.0;
            var max = -1.0;
            for (j=0; j<step; j++) {
                var datum = data[(i*step)+j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }

            cxt.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
        }
    };
