/**
 * Work with strings.
 */
window.addEventListener("DOMContentLoaded", function() {

  //init
  var intervalID;
  var jumpLockout = true;
  var lastInputDown = false;
  var direction = 1;
  var haveKey = false;
  var gameOver = false;

  var inWater = false;

  function unlockJump(){
    jumpLockout = false;
  }

  function startGravity(){
    intervalID = setInterval(gravity, 100); 
  }

  function gravity(){
    move(0, 1, 'down');
  }

  function jumpRight(){
    move(1, 0, 'right'); lastInputDown = false;
  }

  function jumpLeft(){
    move(-1, 0, 'left'); lastInputDown = false;
  }

  function jumpUp(){
    move(0, -1, 'up'); lastInputDown = false;
  }

  function endGame(){
    location.reload();
  }

  startGravity();

  'use strict';
  let rockford = document.getElementById('baddie1'),
    area = document.getElementById('flash'),
    left = area.offsetLeft,
    top  = area.offsetTop,
    posLeft = 0, 
    posTop = 0,
    tileSize = 32,
    gridSize = 24,


    /**
     * This is the background for the game area.
     */
    gameArea = [
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,
      13,16,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,16,16,14,12,16,17,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,16,17,14,17,13,15,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,15,15,13,14,12,16,14,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,12,15,15,17,17,16,12,13,14,12,13,14,12,13,14,12,13,
      13,14,12,13,14,12,13,14,12,17,17,15,13,14,12,13,14,12,13,14,12,13,14,12,
      12,13,14,12,13,14,12,13,14,12,13,14,12,17,17,12,13,14,12,13,14,12,13,14,
      14,12,13,14,12,13,14,16,13,14,12,13,14,17,16,16,16,13,14,12,13,14,19,21,
      13,14,12,13,14,12,13,14,12,13,14,17,13,14,12,16,16,12,13,19,18,18,21,21,
      12,13,14,12,13,14,12,13,14,12,13,14,12,13,17,12,13,19,18,21,21,21,21,21,
      14,12,13,14,12,13,14,12,13,14,12,13,14,15,16,14,12,20,21,21,21,21,21,21,
      24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
      24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
      24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
      24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
      24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
      24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,
    ],

    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    gameBlocks = [
      19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,11,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,18,19,
      19,10,10,10,10,10,10,10,10,10,11,11,11,10,10,10,10,10,10,11,11,11,11,19,
      19,10,10,10,10,10,11,10,11,10,11,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,10,10,10,11,10,11,10,11,10,10,10,10,10,10,10,10,10,10,10,10,19,
      19,10,10,12,12,10,11,11,11,10,11,11,10,10,11,11,11,10,10,10,10,10,10,19,
      19,10,10,10,10,10,11,10,11,10,11,10,10,10,10,10,11,10,10,10,10,10,10,19,
      19,10,10,10,10,10,11,10,11,10,11,20,10,10,10,10,11,10,10,10,10,10,10,19,
      19,12,12,10,10,10,11,10,11,10,11,11,11,10,10,10,11,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,10,10,10,10,10,10,19,
      19,10,12,12,12,10,10,10,10,10,10,10,10,10,10,10,11,10,10,10,10,10,10,19,
      19,10,10,10,10,10,10,10,10,10,10,10,10,11,10,10,11,10,10,10,10,10,10,19,
      19,24,24,24,24,24,24,24,12,12,24,24,24,24,11,11,24,24,24,24,24,24,24,19,
      19,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,19,
      19,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,19,
      19,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,19,
      19,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,19,
      19,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,19,
      19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,
    ];

    /**
     * Draw the initial gameplan
    */
   function drawGamePlan(gameArea, gameBlocks) {
     var i,e,b;
     for(i = 0; i < gameArea.length; i++) {
       e = document.createElement('div');
       e.innerHTML = '';
       e.className = 'tile t' + gameArea[i] + (gameBlocks[i] ? ' b' + gameBlocks[i] : '');
       e.id = 'n' + i;
       area.appendChild(e);
      } 
      
    };
    console.log('Drawing gameplan.');  
    drawGamePlan(gameArea, gameBlocks);
    
    
    /**
     * Move Rockford
    */
   var move = function(moveLeft, moveTop, which) {

    if(which == "down"){
      lastInputDown = true;
    } else {
      lastInputDown = false;
    }
     
     function moveIt() {
       rockford.style.left = (area.offsetLeft + posLeft*tileSize + tileSize/2) + 'px';
       rockford.style.top  = (area.offsetTop + posTop*tileSize + tileSize/2) + 'px';      
      //  console.log("
      // Moved to: " + rockford.style.left + "x" + rockford.style.top);
      };
      if(which) { rockford.className='baddie ' + which; }
      
      
      // First if means the baddie can movie
      if(!(gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize]-10)) {
        posLeft += moveLeft; 
        posTop  += moveTop;
        moveIt();
        inWater = false;
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 24)) {
        inWater = true;
        unlockJump();
        posLeft += moveLeft; 
        posTop  += moveTop;
        moveIt();
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 18)) {
        let audio = new Audio("sounds/trying-to-open-a-locked-door-104302.mp3")
        //audio.play();
        if(haveKey){
          let audio = new Audio("sounds/fanfare.mp3");
          audio.play();
          alert("you win")
          let element = document.getElementById("n142");
          element.classList.remove("b18");
          element.classList.add("b17");
        }
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 20)) {
        gameBlocks[24*11+11] = 10;
        alert("got a key");
        let element = document.getElementById("n275");
        element.classList.remove("b20");
        haveKey = true;
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 21)) {
        clearInterval(intervalID)
        gameOver = true;
        let audio = new Audio("sounds/stone-debris.mp3");
        audio.play();
        setTimeout(endGame, 700);
      } else if((gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize] === 22)) {
        clearInterval(intervalID)
        gameOver = true;
        let audio = new Audio("sounds/stone-debris.mp3");
        audio.play();
        setTimeout(endGame, 700);
      } else {  // Else means the baddie cannot move because of a wall
        console.log('Block detected, cant move.');
        if(lastInputDown == true && jumpLockout == true){
          jumpLockout = false;
        }
      }

      

      console.log("area.offsetLeft", area.offsetLeft);
      console.log("area.offsetTop", area.offsetTop);
      console.log("posLeft", posLeft)
      console.log("posTop", posTop)
    };
    console.log('Moving Mickey Mos (Rockford) to initial spot.');  
    move(1, 1, 'down');
    
    
    /**
     * Keep track on keys pressed and move Rockford accordingly.
    */
   document.onkeyup = function(event) {
    var key;
    key = event.keyCode || event.which;
    if(gameOver){
      return;
    }
    switch(key) {
      case 37: move(-1, 0, 'left'); lastInputDown = false; direction = -1; break;
      case 39: move(1, 0, 'right'); lastInputDown = false; direction =  1; break;
      case 32: 
          if(!jumpLockout){
            /*if(!inWater){
              jumpLockout = true;
            }*/ 
            jumpLockout = true;
            lastInputDown = false;
            //setTimeout(lockoutJump, 800);

            jumpUp();
            jumpUp();
            setTimeout(jumpUp, 50);
            
            if(direction == 1){
              setTimeout(jumpRight, 25);
              setTimeout(jumpRight, 80);
              setTimeout(jumpRight, 150);
              setTimeout(jumpRight, 200);
            } else {
              setTimeout(jumpLeft, 25);
              setTimeout(jumpLeft, 80);
              setTimeout(jumpLeft, 150);
              setTimeout(jumpLeft, 200);
            }
            //move(0, -1, 'up');
            
            clearInterval(intervalID); setTimeout(startGravity, 200); break;
          }
          
      case 40: move(0, 1, 'down'); lastInputDown = true; break; 
      default: move(0, 0, 'down'); lastInputDown = false; break;
    };
    console.log('Keypress: ' + event + ' key: ' + key + ' new pos: ' + rockford.offsetLeft + ', ' + rockford.offsetTop);
  };

    console.log('Everything is ready.');  
});