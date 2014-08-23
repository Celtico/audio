

    p.prototype.setCuePointAtCurrentTime = function(index) {

        this.updatePlatter( false );
        this.cues[index] = new Cue(this.lastBufferTime);
        if (index==0)
            this.cueButton.classList.add("active");

        return this.cues[index];
    };
