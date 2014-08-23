

    p.prototype.skip = function( ticks ) {
        var restart = false;
        if (this.isPlaying) {
            restart = true;
            this.togglePlayback();
        }
        this.lastBufferTime += ticks * 11/360;
        if (this.lastBufferTime<0.0)
            this.lastBufferTime = 0.0;
        if ( restart )
            this.togglePlayback();
        else {
            this.playSnippet();
        }
    };

