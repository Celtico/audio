
    p.prototype.togglePlaybackSpinUpDown = function() {

        var now = myAudioContext.currentTime;

        if (this.isPlaying) {

            if (this.sourceNode) {
                var playback = this.sourceNode.playbackRate;
                playback.cancelScheduledValues( now );
                playback.setValueAtTime( playback.value, now );
                playback.linearRampToValueAtTime( 0.001, now+1 );
                this.gainNode.gain.setTargetAtTime( 0, now+1, 0.01 );
                this.stopTime = now;
                this.sourceNode.stop( now + 2 );
                this.sourceNode = null;
                this.gainNode = null;
            }
            this.isPlaying = false;
            return false;
        }

        sourceNode = myAudioContext.createBufferSource();
        sourceNode.buffer = this.buffer;
        sourceNode.loop = false;

        sourceNode.playbackRate.setValueAtTime( 0.001, now );
        sourceNode.playbackRate.linearRampToValueAtTime( this.currentPlaybackRate, now+1 );

        this.gainNode = myAudioContext.createGain();
        this.gainNode.connect( this.filter );
        this.gainNode.gain.value = this.gain;
        sourceNode.connect( this.gainNode );

        this.sourceNode = sourceNode;
        this.isPlaying = true;
        this.lastTimeStamp = now + 0.5;
        this.offset = this.lastBufferTime;
        this.restartTime = now;
        this.stopTime = 0.0;
        this.lastPBR = this.currentPlaybackRate;

        sourceNode.onended = shutDownNodeWhenDonePlaying.bind(this);
        sourceNode.start( now, this.lastBufferTime );

        return true;
    };

