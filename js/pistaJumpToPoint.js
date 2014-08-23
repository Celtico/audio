
    p.prototype.jumpToPoint = function( time ) {
        var wasPlaying = this.isPlaying;
        if (wasPlaying)
            this.togglePlayback();
        this.lastBufferTime = time;
        if (wasPlaying)
            this.togglePlayback();
    };
