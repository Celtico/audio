

/**
 * AUDIO
 * INIT MICRO
 * */
function handleAudio(stream) {

    if(!isMicro){
        document.getElementById("play").innerHTML  = "Play";
        source = myAudioContext.createMediaStreamSource(stream);
        myAudioAnalyser = myAudioContext.createAnalyser();
        myAudioAnalyser.smoothingTimeConstant = vel_espect;
        myAudioAnalyser.fftSize = 2048;
        source.connect(myAudioAnalyser);
        SpectrumAnimationStart();
        VideoAnimationStart();
        document.getElementById("micro").classList.add("active");
        document.getElementById("audio").classList.remove("active");
        isMicro = true;
    }else{
        source.disconnect();
        myAudioAnalyser = myAudioContext.createAnalyser();
        myAudioAnalyser.smoothingTimeConstant = vel_espect;
        myAudioAnalyser.fftSize = 2048;
        masterGain.connect(myAudioAnalyser);
        SpectrumAnimationStart();
        VideoAnimationStart();
        document.getElementById("micro").classList.remove("active");
        document.getElementById("audio").classList.add("active");
        isMicro = false;
    }
}
/**
 * AUDIO
 * INIT FILE
 * */
document.getElementById("audio").addEventListener("click",function() {

    file_audio.click();

}, false);

file_audio.onchange = function(e){


    for (var i = 0; i < e.srcElement.files.length; i++) {
        var file = e.srcElement.files[i];
        leftTrack.nameElement.innerHTML =  file.name;
        var reader = new FileReader();
        reader.onloadend = function(fileEvent) {
            leftTrack.audioBuffer(fileEvent.target.result);
            document.getElementById("preload-in").innerHTML  = file.name;
        };
        reader.readAsArrayBuffer(file);
        preLoader(reader);
    }
};

/**
 * AUDIO
 * INIT SOUNDCLOUD
 * */
var nameCloudSong;
function getSoundCloudId(track,name) {


    var request = new XMLHttpRequest();
    request.open('GET', track + '?client_id=' + clientIdSoundCloudId_client_id, true);
    request.contentType = 'text/plain';
    request.scope = '*';
    request.responseType = 'arraybuffer';
    request.addEventListener('load',function(event){

        leftTrack.audioBuffer(event.target.response);
        nameCloudSong  = name;

    }, false);
    request.send();
    preLoader(request);

}
$('#search').keyup(function(ev){

    getAudioList($(this).val(),false);
    return false;

});

$(document).on('click','#daw img',function(){

    getSoundCloudId($(this).data('url'),$(this).data('name'));

});

function getAudioList(val,init){

    $.getJSON('http://api.soundcloud.com/tracks.json', {

        q: val,
        limit: 10,
        order: 'hotness',
        downloadable:true,
        client_id:clientIdSoundCloudId_client_id

    }).done(function(sounds) {

        $('.sound').remove();

        sounds.forEach(function(sound) {

            $('<img id="'+sound.id+'" src="' + (sound.artwork_url || sound.user.avatar_url) + '" data-url="'+ sound.stream_url +'" data-name="'+ sound.title +'"  draggable="true">').addClass('sound').appendTo('#daw header');
        });

        if(init !== false){

            //getSoundCloudId(sounds[0].stream_url,sound.title);

        }
    });
}


/**
 * AUDIO
 * PRELOADER
 * */
function preLoader(request){
    request.addEventListener('progress',function(event){
        var preload = Math.round(( event.loaded * 100  ) / event.total );
        document.getElementById("preload-in").setAttribute('style','width:'+ preload + '%;');
        document.getElementById("preload-in").innerHTML  = preload + '%';
        leftTrack.nameElement.innerHTML  = preload + '%';
    }, false);
    document.getElementById("play").setAttribute('style','opacity:1');
    leftTrack.nameElement.innerHTML  = nameCloudSong ;
    leftTrack.nomPiesta = nameCloudSong ;
}

/**
 * AUDIO
 * PAUSE AND TUGGLE
 * */
function toggleSound() {
    if (leftTrack.togglePlaybackSpinUpDown()){
        document.getElementById("play").innerHTML  = "Stop";
        document.getElementById("play").classList.add("active");
        leftTrack.play.classList.add("active");
    }else{
        document.getElementById("play").innerHTML  = "Play";
        document.getElementById("play").classList.remove("active");
        leftTrack.play.classList.remove("active");
    }
}
