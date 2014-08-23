



    p.prototype.changePlaybackRate = function( rate ) {


        this.pitchText.innerHTML = parseFloat(rate).toFixed(2);
        if (!this.isPlaying) {
            this.currentPlaybackRate = rate;
            return;
        }
        var now = myAudioContext.currentTime;

        if (this.lastTimeStamp > now)
            return;


        this.lastBufferTime += (now-this.lastTimeStamp) * this.lastPBR;
        this.lastPBR = rate;
        this.lastTimeStamp = now;

        if (this.lastBufferTime > this.buffer.duration) {
            this.sourceNode = null;
            this.gainNode = null;
            this.lastPBR = this.buffer.duration;
            if (rate >=0)
                return;
            else
                this.lastBufferTime = this.buffer.duration;
        }
        if (this.lastBufferTime < 0) {
            this.sourceNode = null;
            this.gainNode = null;
            this.lastPBR = 0;
            if (rate <= 0)
                return;
            else
                this.lastBufferTime = 0;
        }
        if ( rate == 0.0 ) {
            // stop playing and null the sourceNode
            if (this.sourceNode) {
                this.gainNode.gain.setTargetAtTime( 0, now, 0.01 );
                this.sourceNode.stop(now + 0.1);
                this.sourceNode = null;
                this.gainNode = null;
            }
            return;
        }

        if ( this.sourceNode ) {
            if (((this.currentPlaybackRate > 0) && (rate < 0)) ||
                ((this.currentPlaybackRate < 0) && (rate > 0))	) {
                if (this.sourceNode) {
                    this.gainNode.gain.setTargetAtTime( 0, now, FADE );
                    this.sourceNode.stop(now + FADE*4);
                    this.sourceNode = null;
                    this.gainNode = null;
                }
            }
        }


        if (!this.sourceNode) {
            var sourceNode = myAudioContext.createBufferSource();
            sourceNode.loop = false;
            this.gainNode = myAudioContext.createGain();
            this.gainNode.gain.value = this.gain;
            this.gainNode.connect( this.filter );
            sourceNode.connect( this.gainNode );
            sourceNode.buffer = (rate>0) ? this.buffer : this.revBuffer;
            var startTime = (rate>0) ? this.lastBufferTime : sourceNode.buffer.duration-this.lastBufferTime;

            sourceNode.playbackRate.setValueAtTime( Math.abs(rate), now );
            var duration = (sourceNode.buffer.duration - startTime);
            this.gainNode.gain.value = 0.0;
            this.gainNode.gain.setTargetAtTime( this.gain, now, FADE );
            sourceNode.onended = shutDownNodeWhenDonePlaying.bind(sourceNode);
            sourceNode.start( now, startTime, duration );
            this.sourceNode = sourceNode;
        } else  // if I replace "now" with "0" below, Firefox works.
            this.sourceNode.playbackRate.setValueAtTime( Math.abs(rate), now );
        this.currentPlaybackRate = rate;
    };
