


document.addEventListener("dragstart", function( event ) {

    if(typeof  event.srcElement.getElementsByClassName('dragWindow')[0]  !== 'undefined')
    {
        event.dataTransfer.setData("cords",JSON.stringify({
            target:event.target.getAttribute('class'),
            offsetX: event.clientX - event.target.offsetLeft,
            offsetY: event.clientY - event.target.offsetTop
        }));
        event.target.style.opacity = .5;
    }

}, false);

document.addEventListener('dragover', function (evt) {

    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';

}, false);

document.addEventListener("drop", function( event ) {

    event.preventDefault();
    if(event.dataTransfer.getData("cords"))
    {
        var obj = JSON.parse(event.dataTransfer.getData("cords"));
        document.getElementsByClassName(obj.target)[0].setAttribute('style','top:' +   ( event.pageY  - obj.offsetY )     + 'px;left:'+ ( ( event.pageX  -  obj.offsetX ) + 50 ) +'px;');
    }

}, false);
