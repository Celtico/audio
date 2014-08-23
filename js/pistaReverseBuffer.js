



    function reverseBuffer( buffer ) {
        var newBuffer = myAudioContext.createBuffer( buffer.numberOfChannels, buffer.length, buffer.sampleRate );
        if ( newBuffer ) {
            var length = buffer.length;
            for ( var channel=0; channel<buffer.numberOfChannels; channel++) {
                var oldBuf = buffer.getChannelData( channel );
                var newBuf = newBuffer.getChannelData( channel );
                for (var i=0; i<length; i++)
                    newBuf[length-i-1] = oldBuf[i];
            }
        }
        return newBuffer;
    }
