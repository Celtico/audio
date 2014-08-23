

/**
 * VIDEO & IMAGE
 * */
function handleVideo(stream) {
    contextVideo.clearRect(0, 0,cv_width,cv_height);
    video.src = window.URL.createObjectURL(stream);
    video_element = document.getElementById('videoElement');
    document.getElementById("webcam").classList.add("active");
    document.getElementById("imatgeUp").classList.remove("active");
}

var imgLoader = new Image();
imgLoader.onload = function () {
    video_element = img;
    contextVideo.drawImage(img,0,0,cv_width,cv_height);
    document.getElementById("webcam").classList.remove("active");
    document.getElementById("imatgeUp").classList.add("active");
    playVideo();
};

imgLoader.src = img.src;
document.getElementById("imatgeUp").addEventListener("click",function(){
    file.click();
}, false);

file.onchange = function(e){

    for (var i = 0; i < e.srcElement.files.length; i++) {
        var file = e.srcElement.files[i];
        var reader = new FileReader();
        reader.onloadend = function() {
            img.src = reader.result;
            var imgLoader = new Image();
            imgLoader.onload = function () {
                video_element = img;
                contextVideo.drawImage(img,0,0,cv_width,cv_height);
                document.getElementById("webcam").classList.remove("active");
                document.getElementById("imatgeUp").classList.add("active");
                playVideo();
            };
            imgLoader.src = img.src;
        };
        reader.readAsDataURL(file);
    }
};
