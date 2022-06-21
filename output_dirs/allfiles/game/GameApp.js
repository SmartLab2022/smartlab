const gameCanvas = document.getElementById("canvas");
const gameContext = canvas.getContext("2d");
const bg = document.getElementById("bg");
bg.style.display = "none";
const plane = document.getElementById("plane");
plane.style.display = "none";
const lifeImage = document.getElementById("life");
lifeImage.style.display = "none";
const bulletImg = document.getElementById("bullet");
bulletImg.style.display = "none";
var btnContainer = document.getElementById("btnContainer");
//var btnStartGame : HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnStartGame");
const blastImg = document.getElementById("blast");
blastImg.style.display = "none";
const blastWrongImg = document.getElementById("blastWrong");
blastWrongImg.style.display = "none";
var htopContainer = document.getElementById("htpContainer");
htopContainer.style.display = "none";
var hsContainer = document.getElementById("hsContainer");
hsContainer.style.display = "none";
var btnGameCanvas = document.getElementById("btnGameCanvas");
// btnGameCanvas.style.display="none";
var btnGameStart = document.getElementById("btnGameStart");
var btnHP = document.getElementById("HowtoPlay");
var btnHS = document.getElementById("HighScore");
var btnBack = document.getElementById("btnBack");
var btnBackHS = document.getElementById("btnBackHS");
var gameStatus = document.getElementById("gameStatus");
var gameLevel = document.getElementById("gameLevel");
var gameTextInstruction = document.getElementById("gameTextInstruction");
var btnGamerestart = document.getElementById("gameRestart");
btnGamerestart.style.display = "none";
var btnGameNext = document.getElementById("gameNextLevel");
btnGameNext.style.display = "none";
var btnGameBack = document.getElementById("gameBack");
btnGameBack.style.display = "none";
var order = document.title;
var bullet = new Array();
var planeObj;
var bulletId = 0;
var newRoot = null;
//variables
var life = 3;
var score = 20;
var isGameStarted = false;
var level = 1;
var wrongNodeList = [];
var correctOrderNodeList = [];
btnGameStart.onclick = () => {
    btnContainer.style.display = "none";
    init();
    mainGame();
};
btnHP.onclick = () => {
    btnContainer.style.display = "none";
    htopContainer.style.display = "block";
    hsContainer.style.display = "none";
};
btnHS.onclick = () => {
    getHighScore(order);
    btnContainer.style.display = "none";
    hsContainer.style.display = "block";
    htopContainer.style.display = "none";
};
btnBack.onclick = () => {
    btnContainer.style.display = "flex";
    htopContainer.style.display = "none";
    hsContainer.style.display = "none";
};
btnBackHS.onclick = () => {
    //console.log("HI");
    btnContainer.style.display = "flex";
    htopContainer.style.display = "none";
    hsContainer.style.display = "none";
};
btnGameBack.onclick = () => {
    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    stopGame();
    homeScreen();
    btnContainer.style.display = "flex";
    htopContainer.style.display = "none";
    btnGameBack.style.display = "none";
    hsContainer.style.display = "none";
};
btnGamerestart.onclick = () => {
    console.warn("restart");
    btnContainer.style.display = "none";
    htopContainer.style.display = "none";
    init();
    mainGame();
};
btnGameNext.onclick = () => {
    console.warn("next level");
    btnContainer.style.display = "none";
    htopContainer.style.display = "none";
    nextLevel();
    btnGameNext.style.display = "none";
};
['load', 'resize'].forEach(event => {
    window.addEventListener(event, () => {
        setHeightAndWidthCanvas();
        planeObj = new Plane(canvas, gameContext);
        homeScreen();
        // mainGame();
    }), false;
});
function homeScreen() {
    setBackgroudOfCanvas();
    btnContainer.style.height = gameCanvas.height + "px";
    btnContainer.style.width = gameCanvas.width + "px";
    htopContainer.style.height = gameCanvas.height * 0.80 + "px";
    htopContainer.style.width = gameCanvas.width * 0.80 + "px";
}
function mainGame() {
    isGameStarted = true;
    setHeightAndWidthCanvas();
    setBackgroudOfCanvas();
    gameTree(level);
    if (order == 'Preorder')
        correctOrderNodeList = preOrderNodeList.slice();
    else if (order == 'Inorder')
        correctOrderNodeList = inorderNodeList.slice();
    else
        correctOrderNodeList = postOrderNodeList.slice();
    planeObj.draw();
    newRoot = root;
    startTreeAnimation();
    writeLife();
    // var id = setInterval(setTimer,1000)
    updateTimer();
}
document.addEventListener('mousedown', function (e) {
    shoot();
});
document.onkeydown = function (event) {
    //console.warn("id= "+event.keyCode);
    if (!isGameOver && !isGameWon) {
        switch (event.keyCode) {
            case 65:
            case 37:
                planeObj.velocity.x = -10;
                planeObj.update();
                break;
            case 68:
            case 39:
                planeObj.velocity.x = +10;
                planeObj.update();
                break;
            case 32: //space
                shoot();
        }
    }
    writeTime();
};
let scrollDownTree = false;
let treeSpeed = 0.1;
let treIntervalId;
let isGameOver = false;
let isGameWon = false;
let startingGameYposition = 2;
function init() {
    root = null;
    if (newRoot != null)
        newRoot.gameYposition = startingGameYposition;
    bullet = [];
    wrongNodeList = [];
    life = 3;
    score = 20;
    level = 1;
    nodeCount = 0;
    isGameOver = false;
    isGameStarted = true;
    isGameWon = false;
    clearInterval(gameTimer);
    clearInterval(treIntervalId);
    gameStatus.innerHTML = "";
    btnGamerestart.style.display = "none";
    btnGameBack.style.display = "none";
    btnGameNext.style.display = "none";
    htopContainer.style.display = "none";
    gameStatus.innerHTML = "";
    // console.warn("init");
}
function stopGame() {
    clearInterval(gameTimer);
    clearInterval(treIntervalId);
    gameLevel.innerHTML = "";
    gameStatus.innerHTML = "";
    btnGamerestart.style.display = "none";
    btnGameNext.style.display = "none";
    htopContainer.style.display = "none";
}
function nextLevel() {
    if (level == 5) {
        isGameWon = true;
        gameOver();
    }
    newRoot.gameYposition = startingGameYposition;
    bullet = [];
    wrongNodeList = [];
    level++;
    isGameOver = false;
    isGameStarted = true;
    isGameWon = false;
    nodeCount = 0;
    treeSpeed += 0.025;
    clearInterval(gameTimer);
    clearInterval(treIntervalId);
    gameStatus.innerHTML = "";
    btnGamerestart.style.display = "none";
    btnGameNext.style.display = "none";
    htopContainer.style.display = "none";
    root = null;
    mainGame();
}
function startTreeAnimation() {
    treIntervalId = setInterval(() => {
        scrollDownTree = true;
        gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        setBackgroudOfCanvas();
        updateCanvas();
        for (let i = 0; i < gameNodeList.length; i++) {
            if (gameNodeList[i].nodeCircle.isinside(gameNodeList[i].nodeCircle.X, planeObj.pt.y)) {
                clearInterval(treIntervalId);
                gameOver();
                writeLife();
                break;
            }
        }
        if (!(isGameOver) && !(isGameWon))
            newRoot.gameYposition += treeSpeed;
    }, 1000);
}
//# sourceMappingURL=GameApp.js.map