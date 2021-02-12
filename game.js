var buttonCollors=["red","blue","green", "yellow"];
var randomChosenColour;
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


 $(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
        
    }

 });
  
function nextSequence(){

    userClickedPattern=[];
    level++
    var randomNumber= Math.floor(Math.random()*4);
    randomChosenColour=buttonCollors[randomNumber];    
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);   
    $("h1").text("Level "+level);

}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour); 
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
   
    $("#"+currentColour).addClass("pressed");  
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
     }
        , 100);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);

        }
    }
    else{
        var wrongAudio=new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
