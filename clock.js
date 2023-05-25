var img = "";
var cocossdStatus = "";
var resultarr = [];
var status1 = "";

function preload() {
    img = loadImage('images.jpeg');
}
function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    resultarr = results;
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(320,200);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw() {
    image(img, 0, 0, 640, 420);
    
    if(status1 != "") {
        console.log("inside if");
        document.getElementById("objects_detected").innerHTML = "Detected Objects: "+resultarr.length;
        for(var i=0; i<resultarr.length; i++) {
            fill('#FF0000');
            percent = floor(resultarr[i].confidence * 100);
            text(resultarr[i].label +" , "+ percent+"%", resultarr[i].x+15, resultarr[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(resultarr[i].x, resultarr[i].y, resultarr[i].width, resultarr[i].height);
        }
        
    }
    

}