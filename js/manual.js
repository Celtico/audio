









$(".highA").knob({

    "min":0,
    "max":127,
    'change' : function (velocity) {

        leftTrack.high.gain.value = (velocity - 64)/2;
    }
});


$(".midA").knob({

    "min":0,
    "max":127,
    'change' : function (velocity) {

        leftTrack.mid.gain.value = (velocity - 64)/2;
    }
});

$(".lowA").knob({

    "min":0,
    "max":127,
    'change' : function (velocity) {

        leftTrack.low.gain.value = (velocity - 64)/2;
    }
});






$(".highB").knob({

    "min":0,
    "max":127,
    'change' : function (velocity) {

        rightTrack.high.gain.value = (velocity - 64)/2;
    }
});


$(".midB").knob({

    "min":0,
    "max":127,
    'change' : function (velocity) {

        rightTrack.mid.gain.value = (velocity - 64)/2;
    }
});

$(".lowB").knob({

    "min":0,
    "max":127,
    'change' : function (velocity) {

        rightTrack.low.gain.value = (velocity - 64)/2;
    }
});






$(".shuttleA").knob({
    "min":-1000000,
    "max":1000000,
    'change' : function (velocity) {

       // var thisTickTime = window.performance.now();
        var thisTickTime = velocity.receivedTime;
        if (isMixTrack) { // skips 3 of every four ticks
            if (tickCount<4)
                tickCount++;
            else
                tickCount = 0;
            var delta = thisTickTime - lastTickTime;
            console.log( "tick speed: " + delta );
        }
        if (!tickCount) {
            if (velocity>63) {
                // wheel -1
                leftTrack.skip(-1);
            } else {
                // wheel +1
                leftTrack.skip(1);
            }
        }
        lastTickTime = thisTickTime;

    }
});

$(".shuttleB").knob({

    "min":-1000000,
    "max":1000000,
    'change' : function (velocity) {

        if (isMixTrack) { // skips 3 of every four ticks
            if (tickCount<4)
                tickCount++;
            else
                tickCount = 0;
        }
        if (!tickCount) {

            if (velocity>63) {
                // wheel -1
                rightTrack.skip(-1);
            } else {
                // wheel +1
                rightTrack.skip(1);
            }
        }
    }
});



$(".filterA").knob({
    "min":0,
    "max":127,
    'change' : function (velocity) {

    if (filterTrack == rightTrack) {
    filterTrack = null;
    if (midiOut)
        midiOut.send( [0x80, 0x3b, 0x01] );
        } else {
            filterTrack = rightTrack;
            if (midiOut)
                midiOut.send( [0x90, 0x3b, 0x01] );
        }
        if (midiOut) {  // turn right deck off
            midiOut.send( [0x80, 0x65, 0x01] );
            midiOut.send( [0x80, 0x51, 0x01] );
        }

    }
});


$(".filterB").knob({
    "min":0,
    "max":127,
    'change' : function (velocity) {


          // masterGain.gain.value = velocity/0x66;
         //  filterTrack.filter.frequency.value = logResponse( velocity / 127.0 ) * 10000.0;

    }
});




$(".cue-b").click(function(){

    var i = 0x3b - 0x5d;
    if (i<0)
        i=0;

    if (rightTrack.cueDeleteMode) {
        rightTrack.cues[i] = null;
        if (midiOut)
            midiOut.send( [0x80, 0x3b, 0x01] );
    } else {
        if (rightTrack.cues[i]) {
            // jump to cuePoint
            rightTrack.jumpToCuePoint( i );
            // light up the play button
            if (midiOut)
                midiOut.send( [(rightTrack.isPlaying) ? 0x90 : 0x80,0x3b,0x01]);
            rightTrack.onPlaybackEnd = turnOffRightPlayButton;
        } else {  // cue point wasn't set - set it.
            rightTrack.setCuePointAtCurrentTime(i);
            // light up the appropriate cue button
            if (midiOut)
                midiOut.send( [0x90, noteNumber, 0x01] );
        }
    }
    $(".cue-b.active").removeClass('active');
});

$(".cue-a").click(function(){

    var i = 0x3b - 0x59;
    if (i<0)
        i=0;

    if (leftTrack.cueDeleteMode) {
        leftTrack.cues[i] = null;
        if (midiOut)
            midiOut.send( [0x80, 0x3b, 0x01] );
    } else {
        if (leftTrack.cues[i]) {
            // jump to cuePoint
            leftTrack.jumpToCuePoint( i );
            // light up the play button
            if (midiOut)
                midiOut.send( [(leftTrack.isPlaying) ? 0x90 : 0x80,0x3b,0x01]);
            leftTrack.onPlaybackEnd = turnOffLeftPlayButton;
        } else {  // cue point wasn't set - set it.
            leftTrack.setCuePointAtCurrentTime(i);
            // light up the appropriate cue button
            if (midiOut)
                midiOut.send( [0x90, 0x3b, 0x01] );
        }
    }
    $(".cue-a.active").removeClass('active');
});

$(".cue-b.active").click(function(){
    $(".cue-b.active").removeClass('active');
    rightTrack.cueDeleteMode = !rightTrack.cueDeleteMode;
    midiOut.send( [(rightTrack.cueDeleteMode) ? 0x90 : 0x80,0x5d,0x01]);

});

$(".cue-a.active").click(function(){
    $(".cue-a.active").removeClass('active');
    leftTrack.cueDeleteMode = !leftTrack.cueDeleteMode;
    midiOut.send( [(leftTrack.cueDeleteMode) ? 0x90 : 0x80,0x59,0x01]);

});




$(".pitchAmenos, .pitchAmes").click(function(){

    var i =  0x3b  - 0x59;
    if (i<0)
        i=0;

    if (leftTrack.cueDeleteMode) {
        leftTrack.cues[i] = null;
        if (midiOut)
            midiOut.send( [0x80,  0x3b , 0x01] );
    } else {
        if (leftTrack.cues[i]) {
            // jump to cuePoint
            leftTrack.jumpToCuePoint( i );
            // light up the play button
            if (midiOut)
                midiOut.send( [(leftTrack.isPlaying) ? 0x90 : 0x80,0x3b,0x01]);
            leftTrack.onPlaybackEnd = turnOffLeftPlayButton;
        } else {  // cue point wasn't set - set it.
            leftTrack.setCuePointAtCurrentTime(i);
            // light up the appropriate cue button
            if (midiOut)
                midiOut.send( [0x90,  0x3b , 0x01] );
        }
    }


});


$(".pitchBmes").click(function(){


    var i = 0x3b - 0x5d;
    if (i<0)
        i=0;

    if (rightTrack.cueDeleteMode) {
        rightTrack.cues[i] = null;
        if (midiOut)
            midiOut.send( [0x80, 0x3b, 0x01] );
    } else {
        if (rightTrack.cues[i]) {
            // jump to cuePoint
            rightTrack.jumpToCuePoint( i );
            // light up the play button
            if (midiOut)
                midiOut.send( [(rightTrack.isPlaying) ? 0x90 : 0x80,0x3b,0x01]);
            rightTrack.onPlaybackEnd = turnOffRightPlayButton;
        } else {  // cue point wasn't set - set it.
            rightTrack.setCuePointAtCurrentTime(i);
            // light up the appropriate cue button
            if (midiOut)
                midiOut.send( [0x90, 0x3b, 0x01] );
        }
    }

});


$(".pitchBmenos").click(function(){

    rightTrack.clearCuePoint();
    // un-light up the Deck B cue button
    if (midiOut)
        midiOut.send( [0x80, 0x3c, 0x01] );

});


