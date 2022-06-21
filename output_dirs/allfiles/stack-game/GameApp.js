const stk_canvas = document.getElementById("canvas");
const back = document.getElementById("background");
// stackHsContainer
back.style.display = "none";
const girlImg = document.getElementById("girl");
girlImg.style.display = "none";
const ladder = document.getElementById("ladder");
ladder.style.display = "none";
const plank = document.getElementById("plank");
plank.style.display = "none";
const gold = document.getElementById("gold");
gold.style.display = "none";
const bag = document.getElementById("bag");
bag.style.display = "none";
const stk_life = document.getElementById("stk_life");
stk_life.style.display = "none";
const stk_ctx = stk_canvas.getContext("2d");
let stk_rect = stk_canvas.getBoundingClientRect();
const cmpStackGame = new STKCanvasComponent(stk_canvas);
var gameInstructionList = document.getElementById("gameInstructionList");
gameInstructionList.style.height = stk_canvas.height * 3 + "px";
var btnContainer = document.getElementById("btnContainer");
var htopContainer = document.getElementById("htpContainer");
htopContainer.style.display = "none";
// htopContainer.style.width = canvas.width + "px"
var btnGameStart = document.getElementById("btnGameStart");
var btnHP = document.getElementById("HowtoPlay");
var btnHS = document.getElementById("HighScore");
var btnBack = document.getElementById("btnBack");
var stackHsContainer = document.getElementById("stackHsContainer");
stackHsContainer.style.display = "none";
var btnBackHS = document.getElementById("btnBackHS");
var ClimbButton;
['load', 'resize'].forEach(event => {
    window.addEventListener(event, () => {
        stkHomeScreen();
        // main();
    }), false;
});
btnHS.onclick = () => {
    btnContainer.style.display = "none";
    stackHsContainer.style.display = "block";
    getHighScore('Stack');
};
btnBackHS.onclick = () => {
    btnContainer.style.display = "flex";
    htopContainer.style.display = "none";
    stackHsContainer.style.display = "none";
};
btnGameStart.onclick = () => {
    btnContainer.style.display = "none";
    main();
};
btnHP.onclick = () => {
    btnContainer.style.display = "none";
    htopContainer.style.display = "block";
};
btnBack.onclick = () => {
    btnContainer.style.display = "flex";
    htopContainer.style.display = "none";
};
var lifes = 3;
var score = 0;
var ladders = [];
var ladderCount = 0;
var goldCollectedCount = 0;
var curruntLadder;
var score = 0;
var planks = Array();
var girl;
var prevLadderCount = 0;
var message = "Push the planks in the ladder1 to climb the ladder and collect the Gold";
var goldPoints = [new Point(250, 100), new Point(550, 100), new Point(920, 100)];
var isStkGameOver;
var isStkGameWon;
isStkGameOver = false;
isStkGameWon = false;
stk_canvas.addEventListener("mousedown", mouseDown, false);
function mouseDown(e) {
    if (isStkGameOver == false && isStkGameWon == false) {
        var i = 0;
        var [canvasX, canvasY] = cmpStackGame.getCursorPosition(e);
        let pt = new Point(canvasX, canvasY);
        if (ClimbButton.isInside(pt)) {
            //console.log("Button click")
            climb();
        }
        for (i = 0; i < planks.length; i++) {
            if (planks[i].isinside(pt)) {
                if (planks[i].status != "putted") {
                    planks[i].isDragable = true;
                    message = "";
                }
                if (ladders[prevLadderCount].isTopPlank(planks[i])) { //to pop the top plank from ladder                
                    planks[i].isDragable = true;
                    message = "";
                }
                if (planks[i].isDragable == false) {
                    planks[i].wrongPlank();
                    //console.log("I m here for pop")
                    stk_ctx.fillText("You cannot pop this plank.Pop the Top plank from Ladder" + (prevLadderCount + 1), 300, 70);
                    message = "You cannot pop this plank.Pop the Top plank from Ladder" + (prevLadderCount + 1);
                    lifes--;
                    if (lifes == 0) {
                        isStkGameOver = true;
                        message += ".Game Over";
                        updateLeaderBoard(score, 'Stack', Math.floor(second / 60), second % 60);
                        clearInterval(gameTimer);
                        updateStackGameCanvas();
                        break;
                    }
                }
            }
        }
    }
}
stk_canvas.addEventListener('mousemove', e => {
    if (isStkGameOver == false && isStkGameWon == false) {
        var [canvasX, canvasY] = cmpStackGame.getCursorPosition(e);
        let pt = new Point(canvasX, canvasY);
        for (let i = 0; i < planks.length; i++) {
            if (planks[i].isDragable) {
                let pt1 = new Point(pt.x - planks[i].width / 2, pt.y - planks[i].height / 2);
                putPlank(planks[i], pt1); //draw plank on mouse move
            }
        }
    }
});
var isLadderFull = false;
stk_canvas.addEventListener('mouseup', e => {
    if (isStkGameOver == false && isStkGameWon == false) {
        var [canvasX, canvasY] = cmpStackGame.getCursorPosition(e);
        let pt = new Point(canvasX, canvasY);
        for (let i = 0; i < planks.length; i++) {
            if (planks[i].isDragable) {
                if (planks[i].status == "putted") { // if putted so for pop
                    ladders[prevLadderCount].top--;
                    ladders[prevLadderCount].pop();
                    planks[i].status = "outside";
                    if (ladderCount == 0) {
                        score -= 10;
                        message = "";
                    }
                }
                if (!checkPlankForCorrectPosition(curruntLadder, planks[i])) //wrong position
                 {
                    planks[i].wrongPlank();
                    // if(ladderCount==0)
                    //   message="Push the plank in ladder" +ladderCount
                    //else
                    message = "Push the plank in ladder" + (ladderCount + 1);
                    if (checkplankForWrongPosition(curruntLadder, planks[i])) {
                        lifes--;
                        if (lifes == 0) {
                            isStkGameOver = true;
                            message += " .Game Over";
                            updateLeaderBoard(score, 'Stack', Math.floor(second / 60), second % 60);
                            clearInterval(gameTimer);
                            updateStackGameCanvas();
                            break;
                        }
                        stk_ctx.fillText("Push the plank in the correct position of ladder.Push at the top position of ladder", 300, 70);
                        message = "Push the plank in the correct position of ladder.Push at the top position of ladder";
                    }
                    planks[i].p = planks[i].originalPoints;
                }
                else {
                    //correct position push
                    curruntLadder.push(planks[i]); //push current plank on ladders plank array
                    score += 10;
                    planks[i].p = curruntLadder.correctPositions[curruntLadder.top];
                    planks[i].status = "putted";
                    if (curruntLadder.top == 5)
                        prevLadderCount = ladderCount;
                    curruntLadder.top++;
                    if (curruntLadder.top > 5) {
                        isLadderFull = true;
                        message = "Push on Climb button to Climb the Ladder";
                        //  animateGirl(ladders[ladderCount]);
                        //  curruntLadder = ladders[++ladderCount];
                    }
                }
                planks[i].isDragable = false;
            }
        }
        updateStackGameCanvas();
    }
});
//# sourceMappingURL=GameApp.js.map