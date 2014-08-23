

document.getElementById("close").addEventListener("click",function(){
    document.getElementById("nav").setAttribute('style','display:none');
    canvas2.setAttribute('style','margin-left:0; margin-top:0;');
}, false);
document.getElementById("open").addEventListener("click",function(){
    document.getElementById("nav").setAttribute('style','display:block');
    canvas2.setAttribute('style','margin-left:190px; margin-top: 17px;');
}, false);


