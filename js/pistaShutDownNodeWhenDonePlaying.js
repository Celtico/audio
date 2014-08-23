


    function shutDownNodeWhenDonePlaying(){

        if (this.p) {

            this.p.sourceNode = null;
            this.p.gainNode = null;
            this.p.isPlaying = false;
        }

        if (this.onPlaybackEnd){
            this.onPlaybackEnd();
        }

    }

