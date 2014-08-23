

    var cueColors = ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.33)", "rgba(0,0,0,0.33)"];
    var cueText = ["cue", "1", "2", "3"];



    p.prototype.updatePlatter = function( drawOnScreen ) {
        var now = myAudioContext.currentTime;
        var bufferTime;
        var keepAnimating = this.isPlaying;

        if (!this.isPlaying) {
            if (this.stopTime) {	// still in spin-down;
                if (now > (this.stopTime + 1) ) {	// done spinning down.
                    this.lastBufferTime = this.lastBufferTime + 0.5;
                    this.stopTime = 0;
                    return false;
                } else {
                    // bufferTime = 1/2 acceleration * t^2;  // keeping acceleration = 1 simplifies this!!
                    bufferTime = 1 - (now-this.stopTime);
                    bufferTime = bufferTime * bufferTime;
                    bufferTime = bufferTime / 2;
                    bufferTime = 0.5 - bufferTime + this.lastBufferTime;
                    keepAnimating = true;
    //				console.log( "now:" + now + " stopTime:" + this.stopTime + " bufferTime:" + bufferTime + " this.lastBufferTime:" + this.lastBufferTime );
                }
            } else
                bufferTime = this.lastBufferTime;
        } else if ((this.restartTime + 1) > now) {	// we're still in "spin-up"
            // bufferTime = 1/2 acceleration * t^2;  // acceleration = 1
            bufferTime = now-this.restartTime;
            bufferTime = bufferTime * bufferTime;
            bufferTime = bufferTime / 2;
            bufferTime += this.offset;
        } else {
            this.updateTime( now );
            bufferTime = this.lastBufferTime;
        }

        if (drawOnScreen) {
            var radians = ((bufferTime * REVPERSEC) % 1) * 2 * Math.PI;
            var context = this.platterContext;

            context.clearRect(-150,-150,300,300);

            context.rotate( radians );
            context.fillStyle = "white";
            context.fillText("wubwubwub",-61,8);
            context.rotate( -radians );

            if (this.buffer) {

                var w = this.cBuffer.width;
                var h = this.cBuffer.height;
                var ctx = this.cBuffer.getContext("2d");
                ctx.clearRect(0,0,w,h);
                ctx.drawImage( this.cPista, 0, 0 );
                var boxWidth = w * bufferTime / this.buffer.duration;
                ctx.fillStyle = "rgba(255,255,255,0.33)";
                ctx.fillRect(0,0,boxWidth,h);

                for (var i=0; i<4; i++) {
                    var cue = this.cues[i];
                    if (cue ) {
                        var x = cue.time / this.buffer.duration * w;
                        ctx.fillStyle = cueColors[i];
                        ctx.fillRect( x, 0, 1, h );
                        ctx.font = "12px bold Skia, Arial, sans-serif";
                        ctx.fillText( cueText[i], x+2, h/4 );
                    }
                }

                drawRunningDisplay( runningDisplayContext, this.waveformDisplayCache, bufferTime );

                // draw the center bar
                var isTop = this.active;
                ctx = runningDisplayContext;
                runningDisplayContext.fillStyle = "gray";
                runningDisplayContext.fillRect(RUNNING_DISPLAY_HALF_WIDTH,isTop?0:RUNNING_DISPLAY_HALF_HEIGHT,1,RUNNING_DISPLAY_HALF_HEIGHT);

                // draw cues on the running display
                var begin = bufferTime - (SECONDS_OF_RUNNING_DISPLAY/2);
                var end = begin + SECONDS_OF_RUNNING_DISPLAY;
                for (var i=0; i<4; i++) {
                    var cue = this.cues[i];
                    if (cue && (cue.time>begin) && (cue.time<end)) {
                        var x = (cue.time-begin) * RUNNING_DISPLAY_WIDTH / SECONDS_OF_RUNNING_DISPLAY;
                        ctx.fillStyle = cueColors[i];
                        ctx.fillRect( x, isTop ? 0 : RUNNING_DISPLAY_HALF_HEIGHT, 1, RUNNING_DISPLAY_HALF_HEIGHT );
                        ctx.font = "12px bold Skia, Arial, sans-serif";
                        ctx.fillText( cueText[i], x+2, isTop ? RUNNING_DISPLAY_HALF_HEIGHT/2 : RUNNING_DISPLAY_HALF_HEIGHT*1.5 );
                    }
                }

            }
        }

        return keepAnimating;
    };


