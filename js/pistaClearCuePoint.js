


    p.prototype.clearCuePoint = function( index ) {
        this.cues[index] = null;
        if (index==0)
            this.cueButton.classList.remove("active");
    };
