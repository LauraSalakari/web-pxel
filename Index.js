// no this is panda
// hello is this bear

var arrays = [];

var mouseDown = false;
document.body.onmousedown = function () {
    mouseDown = true;
}
document.body.onmouseup = function () {
    mouseDown = false;
}

function CreatePixel(left, top, x, y) {
    var pixel = document.createElement("div");
    document.getElementById("pixelsContainer").appendChild(pixel);
    pixel.className += "pixel"
    pixel.style.left = left;
    pixel.style.top = top;
    pixel.x = x;
    pixel.y = y;

    pixel.onclick = () => ClickFunction(pixel);
    pixel.addEventListener('mousemove', e => {
        if (mouseDown) {
            ClickFunction(pixel);
        }
    })
    return pixel;
}

var squareBrush = false;
var isDithering = false;

function ClickFunction(pixel) {
    if(squareBrush){
        arrays[pixel.x][pixel.y].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x+1][pixel.y].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x-1][pixel.y].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x][pixel.y+1].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x+1][pixel.y+1].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x-1][pixel.y+1].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x][pixel.y-1].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x+1][pixel.y-1].style.backgroundColor = document.getElementById("color").value;
        arrays[pixel.x-1][pixel.y-1].style.backgroundColor = document.getElementById("color").value;
    }
    else if(isDithering){
        if((pixel.y % 2 == 0) && (pixel.x % 2 == 0) || (pixel.y % 2 != 0) && (pixel.x % 2 != 0)){
            pixel.style.backgroundColor = document.getElementById("color").value;
        }
    }
    else{
        pixel.style.backgroundColor = document.getElementById("color").value;
    }
}

var color;
var firstClick = true;
var eraseColour;

function Erase(pixel){
    if(firstClick){
        color = document.getElementById("color").value;
        eraseColour = document.getElementById("eraseButton").style.backgroundColor;
        document.getElementById("color").value = "#ffffff";
        firstClick = false;
        document.getElementById("eraseButton").style.backgroundColor = "#ffc0cb";
    }
    else{
        document.getElementById("color").value = color;
        firstClick = true;
        document.getElementById("eraseButton").style.backgroundColor = eraseColour;
    }
}

function CreateCanvas() {
    document.getElementById("pixelsContainer").innerHTML = "";
    arrays = [];
    for (var i = 0; i < document.getElementById("heightInput").value; i++) {
        arrays[i]=[];
        for (var j = 0; j < document.getElementById("widthInput").value; j++) {
            var pixel = CreatePixel(i * 13 + "px", j * 13 + "px", i, j);
            arrays[i][j] = pixel;
        }
    }
}

function Clear() {
    arrays.forEach(FindArray);
}

function FindArray(array){
    array.forEach(ClearPixel);
}

function ClearPixel(pixel) {
    pixel.style.backgroundColor = "white";
}

var squareColour;

function SquareBrush(){
    if(squareBrush == false){
        squareColour = document.getElementById("squareButton").style.backgroundColor;
        squareBrush = true;
        document.getElementById("squareButton").style.backgroundColor = "#ffc0cb";
    }
    else{
        document.getElementById("squareButton").style.backgroundColor = squareColour;
        squareBrush = false;
    }
}

var ditherColour;

function Dither(){
    if(isDithering == false){
        ditherColour = document.getElementById("ditherButton").style.backgroundColor;
        isDithering = true;
        document.getElementById("ditherButton").style.backgroundColor = "#ffc0cb";
    }
    else{
        document.getElementById("ditherButton").style.backgroundColor = ditherColour;
        isDithering = false;
    }
}
