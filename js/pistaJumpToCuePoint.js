


    p.prototype.jumpToCuePoint = function( index ) {
        if (this.isPlaying)
            this.togglePlayback();

        this.lastBufferTime = this.cues[index].time;
        this.togglePlayback();
    };
