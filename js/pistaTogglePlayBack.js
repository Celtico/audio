




   p.prototype.togglePlayback = function() {
        var now = myAudioContext.currentTime;

        if (this.isPlaying) {

            if (this.sourceNode) {
                this.sourceNode.track = null;
                this.stopTime = 0;
                this.gainNode.gain.setTargetAtTime( 0.0, now, FADE );
                this.sourceNode.stop( now + FADE*4 );
                this.sourceNode = null;
                this.gainNode = null;
            }
            this.isPlaying = false;
            return "play";
        }

        this.isPlaying = true;
        this.lastTimeStamp = now;
        this.restartTime = now-1;
        this.offset = this.lastBufferTime;
        this.stopTime = 0;
        this.lastPBR = this.currentPlaybackRate;

        this.changePlaybackRate(this.lastPBR);
        return "stop";
    };
