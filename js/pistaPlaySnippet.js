
    p.prototype.playSnippet = function() {
        var now = myAudioContext.currentTime;
        var snippetLength = 11.0/360.0;
        var then = now + snippetLength;
        var sourceNode = myAudioContext.createBufferSource();
        var gainNode = myAudioContext.createGain();

        sourceNode.loop = false;
        gainNode.connect( this.filter );
        sourceNode.connect( gainNode );
        sourceNode.buffer = (this.currentPlaybackRate>0) ? this.buffer : this.revBuffer;
        var startTime = (this.currentPlaybackRate>0) ? this.lastBufferTime : sourceNode.buffer.duration-this.lastBufferTime;

        gainNode.gain.setValueAtTime( 0.0, now );
        gainNode.gain.setTargetAtTime( this.gain, now, FADE );
        gainNode.gain.setTargetAtTime( 0.0, then, FADE );

        sourceNode.track = this;
        sourceNode.onended = shutDownNodeWhenDonePlaying.bind(sourceNode);
        sourceNode.start( now, startTime, sourceNode.buffer.duration - startTime );
        sourceNode.stop( then+snippetLength );
    };
