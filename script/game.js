let player = 1; // Start Game with player No 1
let winner = null;
let scorePlyr1;
let scorePlyr2;
let count = 0;
let flag = false;

var x = window.matchMedia('(max-width: 500px)');

var y = window.matchMedia('(min-width: 501px)');

let winSequenc = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let plyr1SArr = []; // Player 1 Sequence
let plyr2SArr = []; // Player 2 Sequence

// create a one time Event Listener (https://www.sitepoint.com/create-one-time-events-javascript/)

$(document).on("keydown", function (event) {

    console.log(event);

    // bug (if we press mouse left button continuously it automatically triggers keydown event and key = ctrl)

    if (event.code == "Space") {
        initiateGame(); // Game Is ready to play

        restartGame(); // Restart the Game

        if (x.matches) {

            $(".restart-btn").css("display", "inline-block");

            $(".start-btn").css("display", "none");
        }
        $(this).unbind();


    }
});

function initiateGame() {
    $(document).unbind();
    scorePlyr1 = 0;
    scorePlyr2 = 0;
    count = 0;
    flag = true;
    changeTopHeading();
    if (winner == null) {
        $('.plyrScor').text(0);
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

function nextRound() { // Play next round
    if ((winner != null) || (count == 9)) {

        $(document).on("keydown", function (event) {
            if (event.code == "Space") {
                //  bug (if we press mouse left button continuously it automatically triggers keydown event and key = ctrl)

                winner = null;
                player = 1;
                count = 0
                plyr1SArr = [];
                plyr2SArr = [];
                eraseIcon();
                changeTopHeading();
                hideCutLine();
                $(".next-round-btn").css("display", "none");
                if (x.matches) {
                    $(".restart-btn").css("width", "100%");
                }
                // Remove all event handlers (https://www.w3schools.com/jquery/event_unbind.asp#:~:text=Use%20the%20off()%20method,handlers%20using%20an%20event%20object.)
                $(this).unbind();
            }

        });

        $(".next-round-btn").on("click", function () {
            winner = null;
            player = 1;
            count = 0
            plyr1SArr = [];
            plyr2SArr = [];
            eraseIcon();
            changeTopHeading();
            hideCutLine();
            $(".next-round-btn").css("display", "none");
            if (x.matches) {
                $(".restart-btn").css("width", "100%");
            }
            // Remove all event handlers (https://www.w3schools.com/jquery/event_unbind.asp#:~:text=Use%20the%20off()%20method,handlers%20using%20an%20event%20object.)
            $(this).unbind();
        });
    }
}

function restartGame() {
    $(".restart-btn").click(function () {
        $(".game-status").text("Press Space Key To Start The Game");
        $('.plyrScor').text("Score");
        winner = null;
        player = 1;
        count = 0;
        plyr1SArr = [];
        plyr2SArr = [];
        flag = false;
        eraseIcon();
        hideCutLine();
        if (x.matches) {
            $(".restart-btn").css("display", "none");

            $(".next-round-btn").css("display", "none");

            $(".start-btn").css({
                display: "inline-block",
                width: "100%",
            });

            $(".game-status").text("Click Start Button");
        }
        // Remove all event handlers (https://www.w3schools.com/jquery/event_unbind.asp#:~:text=Use%20the%20off()%20method,handlers%20using%20an%20event%20object.)

        $(".box").unbind();
        $(document).on("keydown", function (event) {
            //  bug (if we press mouse left button continuously it automatically triggers keydown event and key = ctrl)

            if (event.code == "Space") {

                initiateGame();

            }
        });



        $(".start-btn").on("click", function () {

            initiateGame();
            $(".restart-btn").css({
                display: "inline-block",
                width: "100%",
            });

            $(".start-btn").css("display", "none");
            $(this).unbind();
            if (x.matches) {
                $(".restart-btn").css({
                    display: "inline-block",
                    width: "100%",
                });
            }

        });

    });
}

function checkDraw() {
    ++count;
    if ((count == 9) && (winner == null)) {
        //    console.log(true);
        return true;
    }
    return false;
}

function checkWhoWin() {
    for (let i = 0; i < 8; i++) {

        if (checker(plyr1SArr, winSequenc[i])) {
            winner = "Player 1";
            // console.log(i);
            showCutLine(i);
            return true;
        }

        if (checker(plyr2SArr, winSequenc[i])) {
            winner = "Player 2";
            // console.log(i);
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
        if (y.matches) {
            $(".game-status").text(winner + " " + "Win" + ", Press Space Key To Next Round");
            $(".next-round-btn").css("display", "none");

            $(".restart-btn").css("width", "auto");
        }
        if (x.matches) {
            $(".game-status").text(winner + " " + "Win" + ", Click Next Round Button");

            $(".next-round-btn").css("display", "inline-block");

            $("button").css("width", "50%");

        }
    }
    if (checkDraw()) {
        if (y.matches) {
            $(".game-status").text("Draw! Press Space Key To Next Round");

            $(".next-round-btn").css("display", "none");

            $(".restart-btn").css("width", "auto");
        }
        if (x.matches) {
            $(".game-status").text("Draw! Click Next Round Button");

            $(".next-round-btn").css("display", "inline-block");

            $("button").css("width", "50%");

        }
    }
}

function changeScore(winner) {

    if (winner == "Player 1") {
        $('#plyr1Scor').text(`${++scorePlyr1}`);
        return;
    }
    if (winner == "Player 2") {
        $('#plyr2Scor').text(`${++scorePlyr2}`);
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
            changeCutLineStyle("0", "16.66%", "100%", "16.66%");
            break;

        case 1:
            changeCutLineStyle("0", "50%", "100%", "50%");
            break;

        case 2:
            changeCutLineStyle("0", "83.33%", "100%", "83.33%");
            break;

        case 3:
            changeCutLineStyle("16.66%", "0", "16.66%", "100%");
            break;

        case 4:
            changeCutLineStyle("50%", "0", "50%", "100%");
            break;

        case 5:
            changeCutLineStyle("83.33%", "0", "83.33%", "100%");
            break;

        case 6:
            changeCutLineStyle("0", "0", "100%", "100%");
            break;

        case 7:
            changeCutLineStyle("0", "100%", "100%", "0");
            break;

    }
}

function hideCutLine() {
    $(".cut-line").css("display", "none");
}

function changeCutLineStyle(x1Value, y1Value, x2Value, y2Value) {

    $("line").attr({
        x1: x1Value,
        y1: y1Value,
        x2: x2Value,
        y2: y2Value,
    });
    $(".cut-line").css("display", "block");
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

function eraseIcon() {
    $(".box").text("");
}

function changeTopHeading() {

    if (winner == null && count != 9) {
        if (player == 0) {
            $(".game-status").text("Play Player 1");
        }
        if (player == 1)
            $(".game-status").text("Play Player 1");

        if (player == 2)
            $(".game-status").text("Play Player 2");
    }
}

$(".start-btn").on("click", function () {
    initiateGame(); // Game Is ready to play

    restartGame(); // Restart the Game
    flag = true;
    $(".restart-btn").css({
        display: "inline-block",
        width: "100%",
    });

    $(".start-btn").css("display", "none");
    $(this).unbind();
});

function changeBtnCss1(x) {
    if (x.matches) {
        if (flag == true) {
            $(".restart-btn").css({
                display: "inline-block",
                width: "100%",
            });

            $(".start-btn").css("display", "none");
        } else {
            $(".restart-btn").css("display", "none");

            $(".start-btn").css({
                display: "inline-block",
                width: "100%",
            });

            $(".game-status").text("Click Start Button");
        }
        if (winner != null) {

            $(".game-status").text(winner + " " + "Win" + ", Click Next Round Button");

            $(".next-round-btn").css("display", "inline-block");

            $("button").css("width", "50%");


        }

        if (count == 9 && winner == null) {


            $(".game-status").text("Draw! Click Next Round Button");

            $(".next-round-btn").css("display", "inline-block");

            $("button").css("width", "50%");


        }
    }
}

function changeBtnCss2(y) {
    if (y.matches) {
        $(".restart-btn").css({
            display: "inline-block",
            width: "auto",
        });

        $(".start-btn").css("display", "none");

        if (flag == false) {
            $(".game-status").text("Press Space Key To Start The Game");
        }

        if (winner != null) {

            $(".game-status").text(winner + " " + "Win" + ", Press Space Key To Next Round");
            $(".next-round-btn").css("display", "none");

            $(".restart-btn").css("width", "auto");

        }

        if (count == 9 && winner == null) {
            $(".game-status").text("Draw! Press Space Key To Next Round");

            $(".next-round-btn").css("display", "none");

            $(".restart-btn").css("width", "auto");
        }
    }
}

changeBtnCss1(x);
changeBtnCss2(y);
x.addListener(changeBtnCss1);
y.addListener(changeBtnCss2);


// All function Name ==>
// function initiateGame();
// function playGame();
// function nextRound();
// function restartGame();
// function checkWhoWin();
// function checker(arr, target);
// function checkDraw();
// function showWhoWin();
// function showCutLine(winSeqNo);
// function showIcon(boxId);
// function changeTopHeading();
// function changeScore(winner);
// function changeCutLineStyle(topValue, leftValue, displayValue, rotateValue, widthValue) ;
// function updatePlyrSeq(boxId, plyrSArr);