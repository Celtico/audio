

var revTime = Date.now();
var midiTest = {
    data:{
        0: 191,
        1: 33,
        2: 0
    },
    receivedTime:revTime
};



$(".filterA").knob({
    "min":0,
    "max":127,
    'change' : function (velocity) {


        midiTest = {
            data:{
                0: 176,
                1: 81,
                2: velocity
            },
            receivedTime:revTime
        };

        midiMessageReceived( midiTest );
    }
});


$(".filterB").knob({
    "min":0,
    "max":127,
    'change' : function (velocity) {


        midiTest = {
            data:{
                0: 176,
                1: 82,
                2: velocity
            },
            receivedTime:revTime
        };

        midiMessageReceived( midiTest );
    }
});





$(".cue-a").click(function(){
    midiTest = {
        data:{
            0: 144,
            1: 92,
            2: 0
        },
        receivedTime:revTime
    };
});
$(".cue-a.active").click(function(){});


$(".cue-b").click(function(){


});


$(".cue-b.active").click(function(){});


var pitchA = 0;

$(".pitchAmes").click(function(){

    pitchA++;

    midiTest = {
        data:{
            0: 176,
            1: 13,
            2: pitchA
        },
        receivedTime:revTime
    };

    midiMessageReceived( midiTest );


});

$(".pitchAmenos").click(function(){

    pitchA--;

    midiTest = {
        data:{
            0: 176,
            1: 13,
            2: pitchA
        },
        receivedTime:revTime
    };

    midiMessageReceived( midiTest );

});


var pitchB = 0;

$(".pitchBmes").click(function(){

    pitchB++;

    midiTest = {
        data:{
            0: 176,
            1: 14,
            2: pitchB
        },
        receivedTime:revTime
    };

    midiMessageReceived( midiTest );

});
$(".pitchBmenos").click(function(){

    pitchB--;

    midiTest = {
        data:{
            0: 176,
            1: 14,
            2: pitchB
        },
        receivedTime:revTime
    };

    midiMessageReceived( midiTest );


});




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








var v,up=0,down=0,i= 0,dir=0;
$(".shuttleA").knob({
    min : 0
    , max : 20
    , stopper : false,
    'change' : function () {

        if(v > this.cv){
            if(up){
                dir =0;
                up = 0;
            }else{
                up=1;
                down=0;
            }
        } else {
            if(v < this.cv){
                if(down){
                    dir=127;
                    down=0;
                }else{
                    down=1;
                    up=0;
                }
            }
        }


        v = this.cv;

        midiTest = {
            data:{
                0: 191,
                1: 60,
                2: dir
            },
            receivedTime:revTime
        };

        midiMessageReceived( midiTest );


    }
});
$(".shuttleB").knob({
    min : 0
    , max : 20
    , stopper : false,
    'change' : function () {

        if(v > this.cv){
            if(up){
                dir =0;
                up = 0;
            }else{
                up=1;
                down=0;
            }
        } else {
            if(v < this.cv){
                if(down){
                    dir=127;
                    down=0;
                }else{
                    down=1;
                    up=0;
                }
            }
        }


        v = this.cv;

        midiTest = {
            data:{
                0: 176,
                1: 33,
                2: dir
            },
            receivedTime:revTime
        };

        midiMessageReceived( midiTest );


    }
});



