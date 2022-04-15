var prediction="";

webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera= document.getElementById("camera");
webcam.attach('#camera');

function take_snapshot(){
webcam.snap(function (data_uri){
document.getElementById("result").innerHTML = '<img id="image captured src="'+data_uri+'" />'
});
}

console.log("ml5 Version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rJIZBCisD/',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
var synth = window.speechSynthesis;
var speak_data = "The prediction is" + prediction;
var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
}

function check(){
    img=document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if(result[0].label=="Best"){
            document.getElementById("result_emoji").innerHTML="&#128077";
            document.getElementById("quote").innerHTML="You are the BEST";
        }
        else if(result[0].label=="Peace"){
            document.getElementById("result_emoji").innerHTML="&#9996";
            document.getElementById("quote").innerHTML="Just PEACE";
        }
        else{
            document.getElementById("result_emoji").innerHTML="&#128076";
            document.getElementById("quote").innerHTML="This is AMAZING";
        }

    }
}