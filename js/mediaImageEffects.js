
var colorToFreq    = SpectrumToRgb();


/**
 * VIDEO OR IMAGES
 * FILTERS RANGER
 * */
var brillo = document.getElementById('brillo');
brillo.onchange = function(){
    context2.clearRect(0, 0, canvas_width2, canvas_height2);
    delta = brillo.value / 1.01;
};
var slider = document.getElementById('slider');
slider.onchange = function(){
    context2.clearRect( 0, 0, canvas_width2, canvas_height2);
    radius =  slider.value / 2;
};
var puns = document.getElementById('puns');
puns.onchange = function(){
    context2.clearRect( 0, 0, canvas_width2, canvas_height2);
    bulletSize =  puns.value * 1.01;
};
var body   = document.getElementById('body');
var fons   = document.getElementById('fons');
fons.onchange = function(){
    body.setAttribute('style','background-color:rgba(0, 0, 0, 0.'+fons.value+')');
};

/**
 * VIDEO OR IMAGES
 * FILTERS
 * */
var sizeX;
var sizeY;
var forma = 1;
function formaChange(e){
    forma = e.value;
}
function forms(ctx,y,x,color,freq){

    if(forma == 1 || forma == 2){
        rendones(ctx,y,x,color,freq);
    }else if(forma == 20){
        lletres(ctx,y,x,color,freq,'M');
    }else if(forma == 19){
        lletres(ctx,y,x,color,freq,'K');
    }else if(forma == 18){
        lletres(ctx,y,x,color,freq,'J');
    }else if(forma == 17){
        lletres(ctx,y,x,color,freq,'I');
    }else if(forma == 16){
        lletres(ctx,y,x,color,freq,'H');
    }else if(forma == 15){
        lletres(ctx,y,x,color,freq,'G');
    }else if(forma == 14){
        lletres(ctx,y,x,color,freq,'F');
    }else if(forma == 13){
        lletres(ctx,y,x,color,freq,'E');
    }else if(forma == 12){
        lletres(ctx,y,x,color,freq,'D');
    }else if(forma == 11){
        lletres(ctx,y,x,color,freq,'C');
    }else if(forma == 10){
        lletres(ctx,y,x,color,freq,'B');
    }else if(forma == 9){
        lletres(ctx,y,x,color,freq,'A');
    }else{
        polygon(ctx, x, y, freq, forma,color);
    }

}
function polygon(ctx, x, y, radius, sides,color) {
    var a = (Math.PI * 2)/sides;
    ctx.beginPath();
    ctx.moveTo(x + radius,y);
    for (var i = 1; i < sides; i++) {
        ctx.lineTo(x + ( radius*Math.cos(a*i) ),y + (radius*Math.sin(a*i)));
    }
    ctx.fillStyle = color;
    ctx.fill();
}
function rendones(ctx,y,x,color,freq){
    ctx.beginPath();
    ctx.arc(x, y, freq, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}
function lletres(ctx,y,x,color,freq,lletra){
    sizeX = x - (freq * 3);
    sizeY = y + (freq * 3);
    ctx.font = ( freq * 6 ) + "px Arial";
    ctx.fillStyle = color;
    ctx.fillText(lletra,sizeX,sizeY);
}
/**
 * Brillo
 */
function brightness(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] += delta;     // red
        d[i + 1] += delta; // green
        d[i + 2] += delta; // blue
    }
    return pixels;
}
/**
 * Hue
 * SATURATION
 */
function hueChange(e){
    value_hue = e.value;
}
function saturationChange(e){
    value_saturation = e.value;
}
function lightnessChange(e){
    value_lightness = e.value;
}
function hueSat(pixels) {
    var satMul, h, s,v;
    var hue = parseInt(value_hue,10)||0;
    var saturation = (parseInt(value_saturation,10)||0) / 100;
    var lightness = (parseInt(value_lightness,10)||0) / 100;
    if (saturation < 0) {
        satMul = 1+saturation;
    } else {
        satMul = 1+saturation*2;
    }
    hue = (hue%360) / 360;
    var hue6 = hue * 6;
    var light255 = lightness * 255;
    var lightp1 = 1 + lightness;
    var lightm1 = 1 - lightness;
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        if (hue != 0 || saturation != 0 || lightness != 0) {
            var vs = r;
            if (g > vs) vs = g;
            if (b > vs) vs = b;
            var ms = r;
            if (g < ms) ms = g;
            if (b < ms) ms = b;
            var vm = (vs-ms);
            var l = (ms+vs)/510;
            if (l > 0) {
                if (vm > 0) {
                    if (l <= 0.5) {
                        s = vm / (vs+ms) * satMul;
                        if (s > 1) s = 1;
                        v = (l * (1+s));
                    } else {
                        s = vm / (510-vs-ms) * satMul;
                        if (s > 1) s = 1;
                        v = (l+s - l*s);
                    }
                    if (r == vs) {
                        if (g == ms)
                            h = 5 + ((vs-b)/vm) + hue6;
                        else
                            h = 1 - ((vs-g)/vm) + hue6;
                    } else if (g == vs) {
                        if (b == ms)
                            h = 1 + ((vs-r)/vm) + hue6;
                        else
                            h = 3 - ((vs-b)/vm) + hue6;
                    } else {
                        if (r == ms)
                            h = 3 + ((vs-g)/vm) + hue6;
                        else
                            h = 5 - ((vs-r)/vm) + hue6;
                    }
                    if (h < 0) h+=6;
                    if (h >= 6) h-=6;
                    var m = (l+l-v);
                    var sextant = h>>0;
                    if (sextant == 0) {
                        r = v*255; g = (m+((v-m)*(h-sextant)))*255; b = m*255;
                    } else if (sextant == 1) {
                        r = (v-((v-m)*(h-sextant)))*255; g = v*255; b = m*255;
                    } else if (sextant == 2) {
                        r = m*255; g = v*255; b = (m+((v-m)*(h-sextant)))*255;
                    } else if (sextant == 3) {
                        r = m*255; g = (v-((v-m)*(h-sextant)))*255; b = v*255;
                    } else if (sextant == 4) {
                        r = (m+((v-m)*(h-sextant)))*255; g = m*255; b = v*255;
                    } else if (sextant == 5) {
                        r = v*255; g = m*255; b = (v-((v-m)*(h-sextant)))*255;
                    }
                }
            }
            if (lightness < 0) {
                r *= lightp1;
                g *= lightp1;
                b *= lightp1;
            } else if (lightness > 0) {
                r = r * lightm1 + light255;
                g = g * lightm1 + light255;
                b = b * lightm1 + light255;
            }
            if (r < 0)
                d[i] = 0;
            else if (r > 255)
                d[i] = 255;
            else
                d[i] = r;

            if (g < 0)
                d[i + 1] = 0;
            else if (g > 255)
                d[i + 1] = 255;
            else
                d[i + 1] = g;

            if (b < 0)
                d[i + 2] = 0;
            else if (b > 255)
                d[i + 2] = 255;
            else
                d[i + 2] = b;
        }
    }
    return pixels;
}
/**
 * Spectrum to RGB
 */
function SpectrumToRgb(){
    var max_color = 765 + 1;
    var max_freq  = 1024 + 1;
    var colorToFreq =  [];
    for(var i = 0; i < max_color; i++) {
        colorToFreq.push(Math.round((i *  max_freq) / max_color));
    }
    return colorToFreq;
}
/**
 * RESULUTION
 */
function definicioChange(e){
    var width    = e.value * 0.7;
    var height   = (width * canvas.height) / canvas.width;
    canvas.height = Math.round(height);
    canvas.width  = Math.round(width);
    canvas_width  = Math.round(width);
    canvas_height = Math.round(height);
}
function transparenciaChange(e){
    transparencia = e.value;
}
function duplicarChange(e){
    duplicar = e.value;
}
