

    p.prototype.updateTime = function( now ) {
        this.lastBufferTime += (now-this.lastTimeStamp) * this.lastPBR;
        this.lastTimeStamp = now;
    };
