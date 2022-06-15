song="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
score_leftWrist="";
score_rightWrist="";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotresults);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function draw(){
    image(video,0,0,600,500);

    if(score_leftWrist>0.2){
        fill("red");
        stroke("red");
        circle(leftWristX,leftWristY,20);
        no_leftWristY=Number(leftWristY);
        whole_no=floor(no_leftWristY);
        volume=whole_no/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
    if(score_rightWrist>0.2){
        fill("red");
        stroke("red");
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed = 0.5X";
        }
        if(rightWristY>100 && rightWristY<=200){
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed = 1X";
        }
        if(rightWristY>200 && rightWristY<=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed = 1.5X";
        }
        if(rightWristY>300 && rightWristY<=400){
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed = 2X";
        }
        if(rightWristY>400 && rightWristY<=500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed = 2.5X";
        }
    }
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}

function stop(){
    song.stop();
}

function gotresults(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y = "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("Score Of Left Wrist = "+score_leftWrist);
        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("Score Of Right Wrist = "+score_rightWrist);
    }
}