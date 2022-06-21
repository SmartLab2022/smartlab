
function setStkHeightAndWidthCanvas() {
    stk_canvas.width = screen.width * 0.80;
    stk_canvas.height = screen.height * 0.80;
}

function setStkBackgroudOfCanvas() {
    back.height = stk_canvas.height;
    back.width = stk_canvas.width
    stk_ctx.font = "20px Arial";
    stk_ctx.drawImage(back, 0, 0, stk_canvas.width, stk_canvas.height);
    stk_ctx.drawImage(stk_life, 1000, 0, stk_life.width * 0.03, stk_life.height * 0.03)
    stk_ctx.fillText(lifes + "", 1040, 20)
    stk_ctx.drawImage(gold, 800, 0, gold.width * 0.2, gold.height * 0.2)
    stk_ctx.fillText(goldCollectedCount + "", 850, 20)
    stk_ctx.fillText("Score:", 650, 20)
    stk_ctx.fillText(score + "", 710, 20)
}

function setgirlOnCanvas() {
    var startX = 54;
    var startY = 391;
    girl = new Girl(girlImg);
    girl.draw();
}



function drawGirl() {
    girl.draw();
}



function setplanks() {
    /* var startX = canvas.width*0.245;
    var startY = canvas.height*0.8;  */
    var startX = 301;
    var startY = 565;

    for (let i = 0; i < 6; i++) {
        planks[i] = new Plank(new Point(startX, startY), plank);
        startX += plank.width + 20;
        planks[i].draw();
    }
}

function drawPlanks() {
    for (let i = 0; i < 6; i++) {
        planks[i].draw();
        if (planks[i].status == "outside") {
            stk_ctx.fillStyle = "#8B0000"
            stk_ctx.font = "bold 18px arial"
            stk_ctx.fillText("Plank" + (i + 1), planks[i].p.x + 5, planks[i].p.y + 40)
        }
        stk_ctx.font = "20px arial"
        stk_ctx.fillStyle = "black"
    }
}


function putPlank(plank: Plank, pt: Point) {
    plank.p = pt;
    updateStackGameCanvas();
    plank.draw();
}

function setladderOnCanvas() {

    /*  var startX = canvas.width/11;
     var startY = canvas.height/3.3;  */
    var startX = 112;
    var startY = 209;
    ladders[0] = new Ladder(stk_canvas, stk_ctx, new Point(startX, startY), ladder);
    ladders[0].draw();

    // startX = canvas.width/3;
    startX = 409;


    ladders[1] = new Ladder(stk_canvas, stk_ctx, new Point(startX, startY), ladder);
    ladders[1].draw();

    //startX = canvas.width/1.7;
    startX = 772;


    ladders[2] = new Ladder(stk_canvas, stk_ctx, new Point(startX, startY), ladder);
    ladders[2].draw();

    ladders[0].correctPositions = [new Point(290, 490),
    new Point(290, 445),
    new Point(290, 400),
    new Point(290, 355),
    new Point(290, 310),
    new Point(290, 263)];

    ladders[1].correctPositions = [new Point(586, 490),
    new Point(586, 445),
    new Point(586, 400),
    new Point(586, 355),
    new Point(586, 310),
    new Point(586, 263)];

    ladders[2].correctPositions = [new Point(950, 490),
    new Point(950, 445),
    new Point(950, 400),
    new Point(950, 355),
    new Point(950, 310),
    new Point(950, 263)];

    curruntLadder = ladders[ladderCount];
}

function drawLadderOnCanvas() {
    for (let i = 0; i < ladders.length; i++) {
        ladders[i].draw();
        stk_ctx.fillStyle = "#8B0000"
        //stk_ctx.fillStyle="#5b00f7"
        stk_ctx.font = "bold 25px arial"
        stk_ctx.fillText("Ladder" + (i + 1), ladders[i].p.x + 160, ladders[i].p.y + 340)
        stk_ctx.font = "20px arial"
        stk_ctx.fillStyle = "black"
    }
}

function checkPlankForCorrectPosition(ladder: Ladder, plank: Plank) {
    if (ladder.top == 6)
        ladder.top = 5;
    if (ladder.isinside(plank.p, plank)) {
        return true;
    }
    return false;
}

function checkplankForWrongPosition(ladder: Ladder, plank: Plank) {
    if (ladder.isInsideAnyposition(plank.p, plank)) {
        return true;
    }
    return false;
}

var gameTimer;
var second = 0;
function updateTimerStack() {
    writeTimeStack();
    gameTimer = setInterval(function () {
        second++;
        updateStackGameCanvas();
        writeTimeStack();
    }, 1000);
}

function writeTimeStack() {
    stk_ctx.font="20px Arial";
    stk_ctx.fillText("Time : " + (second < 10 ? "0" + second : second) + " sec", stk_canvas.width * 0.40, 20);
}
function updateStackGameCanvas() {
    stk_ctx.clearRect(0, 0, stk_canvas.width, stk_canvas.height);
    setStkBackgroudOfCanvas();
    drawLadderOnCanvas();
    drawGolds();
    drawPlanks();
    drawGirl();
    stk_ctx.fillText(message, 300, 70)
    writeTimeStack()
    ClimbButton= new StkButton(stk_ctx,new Point(40,250),100,100,20);
    ClimbButton.draw()
}

function stkHomeScreen() {
    setStkHeightAndWidthCanvas();
   // setBackgroudOfCanvas()
    stk_canvas.style.background = "black"
}

function main() {
    setStkHeightAndWidthCanvas();
    setladderOnCanvas();
    setplanks();
    setgirlOnCanvas();
    updateTimerStack()
    updateStackGameCanvas();
}

function drawGolds() {
    for (let i = 0; i < 3; i++) {
        if (goldCollectedCount >= i + 1) {
            stk_ctx.drawImage(bag, goldPoints[i].x, goldPoints[i].y, bag.width * 0.24, bag.height * 0.23);
            //   stk_ctx.fillText("Congratulations you have collected some gold",300,70)
            //  message="Congratulations you have collected some gold"
        }
        else
            stk_ctx.drawImage(gold, goldPoints[i].x, goldPoints[i].y, gold.width * 0.50, gold.height * 0.50);
    }
}

function godownGirl(ladder: Ladder) {
    if (girl.isOnTop) {
        if (girl.pt.y < girl.originalPt.y) {
            girl.pt.y++;
            updateStackGameCanvas();
        }
        else {
            girl.isOnTop = false;
        }
    }
    else if (girl.pt.x < ((ladder.p.x + ladder.width * 0.24) + 100)) {
        girl.pt.x++;
        updateStackGameCanvas();
    }
    requestAnimationFrame(() => { godownGirl(ladder) });
}
function climb() {
    if (curruntLadder.top > 5) {
        message = "Congratulations you have collected some gold"
        animateGirl(ladders[ladderCount]);
        curruntLadder = ladders[++ladderCount];
    }
    else if (ladderCount == 0) {
        message = "Make the Ladder" + (ladderCount + 1) + " Full with planks to Climb the ladder and Collect Gold"
    }
    else
        message = "You cannot climb the ladder without making it FULL.Empty Ladder" + (prevLadderCount + 1) + " and Fill Ladder" + (ladderCount + 1)
}
function animateGirl(ladder: Ladder) {
    if (girl.isOnTop) {
        if (girl.pt.y < girl.originalPt.y) {
            girl.pt.y++;
            updateStackGameCanvas();
        }
        else {
            girl.isOnTop = false;
        }
    }
    else if (girl.pt.x < (ladder.p.x + ladder.width * 0.24)) {
        girl.pt.x++;
        updateStackGameCanvas();
    }
    else if (girl.pt.y > ladder.p.y) {
        girl.pt.y--;
        updateStackGameCanvas();
    }
    else {
        girl.isOnTop = true;
        goldCollectedCount++;
        updateStackGameCanvas();
        godownGirl(ladder)
        if (goldCollectedCount == 3) {
            isStkGameWon = true;
            message = "Congratulations!!You Have Won the Game"
            updateLeaderBoard(score , 'Stack' , Math.floor(second / 60) , second % 60)
            clearInterval(gameTimer)
        }

        return;
    }
    requestAnimationFrame(() => { animateGirl(ladder) });
}