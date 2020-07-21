let player = 1; // Start Game with player No 1
let winner = null;
let winSequenc = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

let plyr1SArr = [];   // Player 1 Sequence
let plyr2SArr = [];   // Player 2 Sequence

function checkWhoWin() {  
    for (let i = 0; i < 8; i++) {

        if (checker(plyr1SArr, winSequenc[i])) {
            winner = "Player 1"
            return true;
        }

        if (checker(plyr2SArr, winSequenc[i])) {
            winner = "Player 2";
            return true;
        }
    }

    return false;
}

// from stackoverflow(https: //stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array)

function checker(arr, target){
    return target.every(function(value){
       return arr.includes(value);
    })
}



$(".box").click(function(){
    let boxId = $(this).attr("id");
    if(player == 1){
        $("#" + boxId).html('<i class="fas fa-times " id= "icon"></i>');

        plyrSUpdate(boxId,plyr1SArr);
        
        if (checkWhoWin()) {
            console.log(winner);
        }

        player = 2;    // change player
    }
    else{
        $("#" + boxId).html('<i class="far fa-circle " id= "icon"></i>');

        plyrSUpdate(boxId, plyr2SArr);
      
        if (checkWhoWin()) {
            console.log(winner);
        }

        player = 1;   // change player
    }
});

function plyrSUpdate(boxId,plyrSArr){
   
      // update player sequence

      switch(boxId){
          case "box11" : plyrSArr.push(1);
          break;

          case "box12" : plyrSArr.push(2);
          break;

          case "box13" : plyrSArr.push(3)
          break;

          case "box21" : plyrSArr.push(4)
          break;

          case "box22" : plyrSArr.push(5)
          break;

          case "box23" : plyrSArr.push(6)
          break;

          case "box31" : plyrSArr.push(7)
          break;

          case "box32" : plyrSArr.push(8)
          break;

          case "box33" : plyrSArr.push(9)
          break;

      
    }
}