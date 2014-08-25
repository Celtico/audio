
var masterPanner = null;
var myAudioContext = null;
var masterGain = null;
var FADE=0.01;
var leftTrack=null;
var rightTrack=null;
var REVPERSEC = 33.3 / 60.0;
var RUNNING_DISPLAY_WIDTH = 856;
var RUNNING_DISPLAY_HALF_WIDTH = RUNNING_DISPLAY_WIDTH/2;
var RUNNING_DISPLAY_HEIGHT = 50;
var RUNNING_DISPLAY_HALF_HEIGHT = RUNNING_DISPLAY_HEIGHT/2;
var SECONDS_OF_RUNNING_DISPLAY = 2.0;
var bCWidth = 370;
var bCHeight = 50;


function p(url,active,pista){


    var pThis    = this;
    var pContent = document.createElement("div");


    pContent.p         = pThis;
    pContent.className = "pista loading";
    pThis.active       = active;




    //pContentNew
    var pContentNew = document.createElement("div");
    pContentNew.className = "nom";
    pContentNew.appendChild( document.createTextNode(url) );
    this.nameElement = pContentNew;
    pContent.appendChild(pContentNew);
    this.nomPiesta = url;


    //Draw Buffer
    var pDrawBuffer = document.createElement("div");
    pDrawBuffer.className = "pDrawBuffer";
    pDrawBuffer.onclick = function ( ev ) {
        this.parentNode.p.jumpToPoint(
            ev.offsetX / 370.0 * this.parentNode.p.buffer.duration
        );
    };




    //Canvas buffer draw
    var canvas     = document.createElement("canvas");
    canvas.width   = bCWidth;
    canvas.height  = bCHeight;
    this.cBuffer   = canvas;
    pDrawBuffer.appendChild(canvas);
    canvas        = document.createElement("canvas");
    canvas.width  = bCWidth;
    canvas.height = bCHeight;
    canvas.style.zIndex = "100";
    this.cPista   = canvas;
    pContent.appendChild(pDrawBuffer);


    //Disco
    var platter = document.createElement( "canvas" );
    platter.className = "platter";
    this.platterContext = platter.getContext("2d");
    this.platterContext.fillStyle = "white";
    platter.width = 300;
    platter.height = 300;
    this.platterContext.translate(150,150);



    //Pitch
    var pitchDiv = document.createElement("div");
    pitchDiv.className =  "pitch-slider-" + pista;
    var pitch = document.createElement("input");
    pitch.className = "slider";
    pitch.type = "range";
    pitch.min = "-2";
    pitch.max = "2";
    pitch.step = "0.01";
    pitch.value = "1";
    pitch.oninput = function(event) {
        this.parentNode.parentNode.p.changePlaybackRate(event.target.value);
    };
    pitchDiv.appendChild(pitch);
    var  pitchText = document.createElement( "span" );
    pitchText.appendChild( document.createTextNode("1.00"));
    this.pitchText = pitchText;
    pitchDiv.appendChild(pitchText);
    pContent.appendChild(pitchDiv);





    //Volum
    var volDiv = document.createElement("div");
    volDiv.className =  "volum-slider-" + pista;
    var volum = document.createElement("input");
    volum.className = "slider";
    volum.type = "range";
    volum.min = "0";
    volum.max = "2";
    volum.step = "0.01";
    volum.value = "1";
    volum.oninput = function(event){
        this.parentNode.parentNode.p.changeGain(event.target.value);
    };
    volDiv.appendChild(volum);
    var volText = document.createElement( "span" );
    volText.appendChild( document.createTextNode("1.00"));
    volDiv.appendChild(volum );
    this.volText = volText;
    volDiv.appendChild(volText);
    pContent.appendChild(volDiv);



    //Cue
    var cueB = document.createElement( "div" );
    cueB.className = "cue-" + pista;
    cueB.appendChild( document.createTextNode("Cue") );
    cueB.onclick=cue;
    pContent.appendChild( cueB );



    //Play
    var play = document.createElement("div");
    play.className = "play-" + pista;
    play.appendChild( document.createTextNode("Play") );
    play.onclick = function() {
        if(this.parentNode.p) {
            if (this.parentNode.p.togglePlaybackSpinUpDown()){

                this.classList.add("active");
                document.getElementById("play").innerHTML  = "Stop";
                document.getElementById("play").classList.add("active");

            }else{

                this.classList.remove("active");
                document.getElementById("play").innerHTML  = "Play";
                document.getElementById("play").classList.remove("active");
            }
        }
    };
    this.play = play;
    pContent.appendChild(play);


    //Insertem la pista
    document.getElementById("pContent").appendChild(pContent);
    this.trackElement = pContent;






    //Drag over
    pContent.addEventListener('dragover', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }, false);


    //Drag enter
    pContent.addEventListener('dragenter', function () {
        pContent.classList.add("droptarget");
        return false;
    }, false );


    //Drag leave
    pContent.addEventListener('dragleave', function () {
        pContent.classList.remove("droptarget");
        return false;
    }, false );


    //Drop pi
    pContent.addEventListener('drop', function (ev) {
        ev.preventDefault();
        if(typeof ev.dataTransfer.files[0] === 'undefined'){

            Array.prototype.map.call(document.getElementsByTagName('img'), function(img) {
                if(img.src == ev.dataTransfer.getData("url")){

                    pContent.classList.remove("droptarget");
                    pContent.classList.add("loading");
                    pContent.firstChild.innerHTML = img.getAttribute('data-name');
                    pThis.nomPiesta = img.getAttribute('data-name');
                    pThis.loadP( img.getAttribute('data-url')   + '?client_id=' + clientIdSoundCloudId_client_id );
                }
            });

        }else{

            pContent.classList.remove("droptarget");
            pContent.classList.add("loading");
            pContent.firstChild.innerHTML = ev.dataTransfer.files[0].name;
            pThis.nomPiesta = ev.dataTransfer.files[0].name;
            var reader = new FileReader();
            reader.onload = function (event) {
                pThis.audioBuffer( event.target.result);
            };
            reader.onerror = function (event) {
                alert("Error: " + reader.error );
            };
            reader.readAsArrayBuffer(ev.dataTransfer.files[0]);
            preLoaderPista(pContent.firstChild, pThis.cBuffer,reader);
        }
        return false;
    }, false );








    this.gain                   = 1.0;
    this.gainSlider             = volum;
    this.pbrSlider              = pitch;
    this.currentPlaybackRate    = 1.0;
    this.lastBufferTime         = 0.0;
    this.isPlaying              = false;


    this.loadP( url );

    //VOL
    this.xfadeGain              =  myAudioContext.createGain();
    this.xfadeGain.gain.value   = 0.5;
    this.xfadeGain.connect(masterGain);



    //FILTRE LOW PASS
    this.low                    = myAudioContext.createBiquadFilter();
    this.low.type               = "lowshelf";
    this.low.frequency.value    = 320.0;
    this.low.gain.value         = 0.0;
    this.low.connect( this.xfadeGain );



    //FILTRE PEAKING
    this.mid                    = myAudioContext.createBiquadFilter();
    this.mid.type               = "peaking";
    this.mid.frequency.value    = 1000.0;
    this.mid.Q.value            = 0.5;
    this.mid.gain.value         = 0.0;
    this.mid.connect( this.low );


    //FILTRE HIGHHELF
    this.high                   = myAudioContext.createBiquadFilter();
    this.high.type              = "highshelf";
    this.high.frequency.value   = 3200.0;
    this.high.gain.value        = 0.0;
    this.high.connect( this.mid );



    //FILTRE LOWPASS
    this.filter                 = myAudioContext.createBiquadFilter();
    this.filter.frequency.value = 20000.0;
    this.filter.type            = this.filter.LOWPASS;
    this.filter.connect( this.high );


    //CUE
    this.cues                   = [ null, null, null, null ];
    this.cueButton              = cueB;
    this.cueDeleteMode          = false;
}

