

function drawRunningDisplay( context, cache, centerInSeconds ) {
    var center = Math.floor( centerInSeconds * RUNNING_DISPLAY_WIDTH / SECONDS_OF_RUNNING_DISPLAY );
    var left = center - RUNNING_DISPLAY_HALF_WIDTH;
    var leftEdgeIndex = Math.floor((center - RUNNING_DISPLAY_HALF_WIDTH)/MAX_CANVAS_WIDTH);
    if (leftEdgeIndex<0)
        leftEdgeIndex=0;
    var rightEdgeIndex = Math.floor((center + RUNNING_DISPLAY_HALF_WIDTH)/MAX_CANVAS_WIDTH);
    if (rightEdgeIndex>=cache.length)
        rightEdgeIndex = cache.length - 1;
    for (var i = leftEdgeIndex; i<=rightEdgeIndex; i++) {
        context.drawImage( cache[i], RUNNING_DISPLAY_HALF_WIDTH - center + (MAX_CANVAS_WIDTH*i), 0 );
    }
}
