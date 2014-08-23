
    p.prototype.changeGain = function( gain ) {
        gain = parseFloat(gain).toFixed(2);
        if (this.gainNode) {
            this.gainNode.gain.cancelScheduledValues( 0 );
            this.gainNode.gain.value = gain;
            this.gainNode.gain.setValueAtTime(gain,0);
        }
        this.volText.innerHTML = gain;
    };
