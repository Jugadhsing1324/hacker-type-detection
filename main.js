img="";
status="";
objects=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects..."
}

function modelLoaded(){
    console.log("Model Is Loaded");
    status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
        console.log(results);

    

}

function draw(){
    image(img,0,0,640,420);

    /* MANUAL CODE FOR RECTANGLES
    //dog
    fill("green");
    text("Dog",50,75);
    noFill();
    stroke("green");
    rect(30,60,350,350);

    //cat
    fill("blue");
    text("Cat",550,90);
    noFill();
    stroke("blue");
    rect(290,70,320,320);
    */


    if(status!=""){
        for(i=0; i<objects.length ; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected !";
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" accuracy is "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}