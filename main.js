object = [];
video = "";
status = "";
function preload(){
    video = createVideo('video.mp4')
    video.hide();
}

function setup(){
    canvas = createCanvas(380, 480);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 380, 480);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for (i=0; i< object.length; i++){
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("number_of_objects") = "Number of Objects Detected Are:" + objects.length;

            fill("FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label = "" + percent + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill()
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if (error){
    console.log(error)
}
console.log(results);
objects = results;
}