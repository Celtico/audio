
/**
 * NAV BAR
 */
function toggleSection(e){
    var bodySection = e.nextSibling.nextSibling;
    bodySection.style.display == "block" ?  bodySection.style.display = "none" :
        bodySection.style.display = "block";
    var hashFull = e.classList[0];
    if(typeof hashFull === 'undefined'){
        e.classList.add("open");
    }else{
        e.classList.remove("open");
    }
}
document.getElementById("fullScreen").addEventListener("click",fullScreen, false);
function fullScreen(){
    toggleFullScreen();
    var hashFull = document.getElementById("body").classList[0];
    if(typeof hashFull === 'undefined'){
        document.getElementById("body").classList.add("fullScreen");
    }else{
        document.getElementById("body").classList.remove("fullScreen");
    }
}
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}