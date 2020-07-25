let player = 1; // Start Game with player No 1
let winner = null;
let scorePlyr1;
let scorePlyr2;
let count = 0;
let winSequenc = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

let plyr1SArr = []; // Player 1 Sequence
let plyr2SArr = []; // Player 2 Sequence

// create a one time Event Listener (https://www.sitepoint.com/create-one-time-events-javascript/)

$(document).on("keydown", function (event) {

    
// bug (if we press mouse left button continuously it automatically triggers keydown event and key = ctrl)

   if(event.code == "Space"){
       initiateGame();    // Game Is ready to play
       
       restartGame();     // Restart the Game

       $(this).unbind();
   }
});

function initiateGame() {
    $(document).unbind();
    scorePlyr1 = 0;
    scorePlyr2 = 0;
    changeTopHeading();
    if (winner == null) {
        $('.player').text(0);
    }
    playGame(); // Play the game
}

function playGame() {

    $(".box").click(function () {
        let boxId = $(this).attr("id");
        if (player == 1) {
            if (showIcon(boxId)) {

                updatePlyrSeq(boxId, plyr1SArr);
                showWhoWin();
                changeScore(winner);
                nextRound();
                player = 2; // change player
                
                changeTopHeading();

            }
        } else {
            if (showIcon(boxId)) {

                updatePlyrSeq(boxId, plyr2SArr);
                showWhoWin();
                changeScore(winner);
                nextRound();
                player = 1; // change player
                
                changeTopHeading();

            }
        }
    });
}

function nextRound(){    // Play next round
   if((winner != null) || (count == 9)){
       
       $(document).on("keydown", function (event){
           if(event.code == "Space"){
            //  bug (if we press mouse left button continuously it automatically triggers keydown event and key = ctrl)

               winner = null;
               player = 1;
               count = 0
               plyr1SArr = [];
               plyr2SArr = [];
               eraseIcon();
               changeTopHeading();
               hideCutLine();
                // Remove all event handlers (https://www.w3schools.com/jquery/event_unbind.asp#:~:text=Use%20the%20off()%20method,handlers%20using%20an%20event%20object.)
             $(this).unbind();
           }
           
       });
   }
}
 function restartGame(){
     $(".restart").click(function(){
         $(".top-heading").text("Press Space Key To Start The Game");
         $('.player').text(0);
         winner = null;
         player = 1;
         plyr1SArr = [];
         plyr2SArr = [];
         eraseIcon();
         hideCutLine();

         // Remove all event handlers (https://www.w3schools.com/jquery/event_unbind.asp#:~:text=Use%20the%20off()%20method,handlers%20using%20an%20event%20object.)
         
         $(".box").unbind();
         $(document).on("keydown", function (event) {
            //  bug (if we press mouse left button continuously it automatically triggers keydown event and key = ctrl)

             if (event.code == "Space"){

                 initiateGame();

             }
         });
  
     });
 }
function checkDraw(){
   ++count;
   if((count == 9) && (winner == null)){
       console.log(true);
       return true;
   }
   return false;
 }

function checkWhoWin() {
    for (let i = 0; i < 8; i++) {

        if (checker(plyr1SArr, winSequenc[i])) {
            winner = "Player 1";
            console.log(i);
            showCutLine(i);
            return true;
        }

        if (checker(plyr2SArr, winSequenc[i])) {
            winner = "Player 2";
            console.log(i);
            showCutLine(i);
            return true;
        }
    }

    return false;
}

// from stackoverflow(https: //stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array)

function checker(arr, target) {
    return target.every(function (value) {
        return arr.includes(value);
    })
}

function showWhoWin() {
    if (checkWhoWin()) {
        $(".top-heading").text(winner + " " + "Win" + ", Press Space Key To Next Round");
    }
    if(checkDraw()){
       $(".top-heading").text("Draw! Press Space Key To Next Round");
    }
}

function changeScore(winner) {

    if (winner == "Player 1") {
        $('.player1').text(`${++scorePlyr1}`);
        return;
    }
    if (winner == "Player 2") {
        $('.player2').text(`${++scorePlyr2}`);
        return;
    }
    
}

function updatePlyrSeq(boxId, plyrSArr) {

    // update player sequence

    switch (boxId) {
        case "box11":
            plyrSArr.push(1);
            break;

        case "box12":
            plyrSArr.push(2);
            break;

        case "box13":
            plyrSArr.push(3)
            break;

        case "box21":
            plyrSArr.push(4)
            break;

        case "box22":
            plyrSArr.push(5)
            break;

        case "box23":
            plyrSArr.push(6)
            break;

        case "box31":
            plyrSArr.push(7)
            break;

        case "box32":
            plyrSArr.push(8)
            break;

        case "box33":
            plyrSArr.push(9)
            break;


    }
}

function showCutLine(winSeqNo) {
    switch (winSeqNo) {
        case 0:
            changeCutLineCss("50px", "0px", "block", "rotate(0deg)", "350px");
            break;

        case 1:
            changeCutLineCss("160px", "0px", "block", "rotate(0deg)", "350px");
            break;

        case 2:
            changeCutLineCss("270px", "0px", "block", "rotate(0deg)", "350px");
            break;

        case 3:
            changeCutLineCss("160px", "-110px", "block", "rotate(90deg)", "350px");
            break;

        case 4:
            changeCutLineCss("160px", "0px", "block", "rotate(90deg)", "350px");
            break;

        case 5:
            changeCutLineCss("160px", "110px", "block", "rotate(90deg)", "350px");
            break;

        case 6:
            changeCutLineCss("160px", "-60px", "block", "rotate(-135deg)", "470px");
            break;

        case 7:
            changeCutLineCss("160px", "-60px", "block", "rotate(135deg)", "470px");
            break;

    }
}

function hideCutLine(){
    $(".cut-line").css("display", "none");
}

function changeCutLineCss(topValue, leftValue, displayValue, rotateValue, widthValue) {

    $(".cut-line").css({
        top: topValue,
        left: leftValue,
        display: displayValue,
        transform: rotateValue,
        width: widthValue
    });
}

function showIcon(boxId) {
    // When User Click Show Cross or Circle Icon
    if (($("#" + boxId).children().length == 0) && (player == 1) && winner == null) {
        $("#" + boxId).html('<i class="fas fa-times " id= "icon"></i>');

        return true;
    }

    if (($("#" + boxId).children().length == 0) && (player == 2) && winner == null) {
        $("#" + boxId).html('<i class="far fa-circle " id= "icon"></i>');

        return true
    }

    return false;
}

function eraseIcon(){
    $(".box").text("");
}

function changeTopHeading() {

    if (winner == null && count != 9) {
        if (player == 0) {
            $(".top-heading").text("Play Player 1");
        }
        if (player == 1)
            $(".top-heading").text("Play Player 1");

        if (player == 2)
            $(".top-heading").text("Play Player 2");
    }
}