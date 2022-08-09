img="";
status="";
objects=[];


function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects..."
}

function modelLoaded(){
    console.log("Model Is Loaded");
    status=true;
    
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects=results;
    

}

function draw(){
    image(video,0,0,380,380);

    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(var i=0; i<objects.length ; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected !";
            document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected Are : "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" accuracy is "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}