
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yb0rU84aM/model.json", model_loaded);

function model_loaded(){
    console.log("Model is loaded");
   
}

Webcam.set({   
    width:350,
    height:300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function CaptureImage(){
    
    Webcam.snap(function(uri){
        document.getElementById("snapshot").innerHTML = '<img id="result" src = "'+uri+'">';
        
    });
}

prediction_1 = "";
prediction_2 = "";
function speak_agent(){
    var potato = window.speechSynthesis;

    string_1 = "The first prediction is " + prediction_1;
    string_2 = " and The second prediction is " + prediction_2;
    data_speak = string_1 + string_2;

    utter_this = new SpeechSynthesisUtterance(data_speak);

    potato.speak(utter_this);

}


function PredictImage(){
    img = document.getElementById("result");
    classifier.classify(img,got_results);
    
    
}

function got_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        
        document.getElementById("result_emotion_name1").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;

        speak_agent();


        if (prediction_1 == "One"){
            document.getElementById("update_emoji1").innerHTML = "&#9757;";
            
        } 
        if (prediction_1 == "Two"){
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
            
        } 
        if (prediction_1 == "Three"){
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
            
        }

        if (prediction_2 == "One"){
            document.getElementById("update_emoji2").innerHTML = "&#9757;";
            
        } 
        if (prediction_2 == "Two"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
            
        } 
        if (prediction_2 == "Three"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
            
        } 

    }
}





