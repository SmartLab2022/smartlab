
function setHeightAndWidthCanvas() {
    canvas.width = screen.width * 0.80;
    canvas.height = screen.height * 0.65;
}

function setBackgroudOfCanvas() {
    // var background = new Image();
    bg.src = "../../images/background.png";
    bg.height = canvas.height;
    bg.width = canvas.width;
    gameContext.drawImage(bg, 0, 0, bg.width, bg.height)

}

function updateCanvas() {
    gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    setBackgroudOfCanvas();


    gameTree(level);

    for (var i = 0; i < gameNodeList.length; i++) {
        // blastImg.height = 35 
        // blastImg.width = 35
        blastNode(gameNodeList[i])

    }

    planeObj.draw();
    checkForCollissions();

    //  console.warn("size= "+bullet.length);
    bullet.forEach((element, index) => {

        element.draw();

    });
    writeLife();
    // updateTimer()
    for (var i = 0; i < wrongNodeList.length; i++) {
        blastNode(wrongNodeList[i], false);
        // blastWrongNode(wrongNodeList[i])

    }

}
let nodeCount = 0;
function checkForCollissions() {
    // console.warn("check= " +gameNodeList.length);

    bullet.forEach((element, index) => {


        for (let i = 0; i < gameNodeList.length; i++) {
            if (!gameNodeList[i].isLocked && (gameNodeList[i].nodeCircle.isinside(element.pt.x, element.pt.y) || gameNodeList[i].nodeCircle.isinside(element.pt.x + element.img.width, element.pt.y))) {

                if (gameNodeList[i] == correctOrderNodeList[nodeCount]) {
                    score += 10;

                    var isfound = false;
                    var foundNode;
                    var currNode = gameNodeList[i];

                    for (var k = 0; k < wrongNodeList.length; k++) {
                        if (wrongNodeList[k].value == currNode.value) {
                            foundNode = currNode
                            isfound = true;
                            break;
                        }
                    }

                    if (isfound) {
                        var temp_list = wrongNodeList;
                        wrongNodeList = []
                        for (var k = 0; k < temp_list.length; k++) {
                            if (temp_list[k].value != foundNode.value)
                                wrongNodeList.push(temp_list[k]);
                        }
                    }


                    /*  gameNodeList[i].nodeCircle.setNodeColor(FIXED_VALUE.animateBorderColor, FIXED_VALUE.animateFillColor, FIXED_VALUE.animateTextColor);
                     gameNodeList[i].nodeCircle.draw(canvasComponent); */
                    gameNodeList[i].isLocked = true;
                    bullet.splice(index, 1);

                    element.isAlive = false;

                    blastNode(gameNodeList[i])

                    if (gameNodeList[i] == correctOrderNodeList[correctOrderNodeList.length - 1]) {
                        console.warn("Level completed!!");
                        isGameWon = true;
                        btnGameNext.style.display = "inline";
                    }
                    nodeCount++;
                }
                else {
                    console.warn("Wrong Node!!!");

                    var hasElement = false;
                    for (var v = 0; v < wrongNodeList.length; v++) {
                        if (wrongNodeList[v].value == gameNodeList[i].value) {
                            hasElement = true;
                        }
                    }
                    if (!hasElement) {
                        wrongNodeList.push(gameNodeList[i])
                    }
                    // blastWrongNode(gameNodeList[i])
                    blastNode(gameNodeList[i], false)


                    score -= 5;
                    // gameNodeList[i].nodeCircle.changeColor();
                    element.isAlive = false;
                    bullet.splice(index, 1)
                    if (life > 0)
                        life--;
                    if (life == 0) {
                        gameOver();
                    }
                }

                break;
            }
            else if (element.pt.y <= 0) {
                element.isAlive = false;

                bullet.splice(index, 1);
                break;
            }
        }

    })
}
var minutes = 0
var seconds = 0;
var gameTimer;
function updateTimer() {

    writeTime();

    gameTimer = setInterval(function () {

        seconds++;
        updateCanvas();
        writeTime();
    }, 1000);


}
function writeTime() {
    gameContext.fillText("Time : " + (seconds < 10 ? "0" + seconds : seconds) + " sec", gameCanvas.width * 0.90, 30);

}

function writeLife() {

    lifeImage.height = 48;
    lifeImage.width = 48;
    gameContext.drawImage(lifeImage, gameCanvas.width * 0.75, 0)


    gameContext.fillStyle = "#fff";
    gameContext.font = '20px san-serif';
    gameContext.fillText(life.toString(), gameCanvas.width * 0.75 + lifeImage.width, 30);


    gameContext.fillText("Score: " + score, gameCanvas.width * 0.65 + lifeImage.width, 30);



    //write game level
    gameLevel.innerHTML = "Level " + level;

    if (isGameOver) {

        gameStatus.innerHTML = "<b style='color:red'> Game Over  </b>";
        clearInterval(gameTimer);
        writeTime();
        showGameButtons();

    }
    else if (isGameWon) {

        gameStatus.innerHTML = "Level completed!!";

        clearInterval(gameTimer);
        writeTime();

    }

}

function shoot() {
    if (!isGameOver && isGameStarted && !isGameWon) {
        var i: number = 0;
        bullet.push(new Bullet(canvas, gameContext, bulletId++));

        bullet[bullet.length - 1].update();
        writeTime();

    }
}

function gameOver() {
    isGameOver = true;
    btnGameBack.style.display = "inline";

    btnGamerestart.style.display = "inline";
    updateLeaderBoard(score, order, Math.floor(seconds / 60), seconds % 60)
    seconds = 0;
}
function showGameButtons() {

    // btnGameCanvas.style.display = "block"
}
function blastNode(node: BinarySearchTreeNode, isTrue = true) {
    if (isTrue) {
        if (node.isLocked) {
            var x = node.nodeCircle.X - (FIXED_VALUE.radius * 2.33)
            var y = node.nodeCircle.Y - (FIXED_VALUE.radius * 2.33)
            gameContext.drawImage(blastImg, x, y);
        }
    } else {
        var x = node.nodeCircle.X - (FIXED_VALUE.radius * 2.33)
        var y = node.nodeCircle.Y - (FIXED_VALUE.radius * 2.33)
        gameContext.drawImage(blastWrongImg, x, y);
    }

}