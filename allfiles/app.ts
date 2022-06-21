let cnt = -1;
var stckElmnt: element[] = new Array();
var ele = <HTMLInputElement>document.getElementById("pushbutton");

window.onresize = () => {
    canvasCmp.clearCanvas();
    canvasCmp.resizeCanvas();
    if(next>0)
        next--;

    demoNext();


}

const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const canvasCmp = new CanvasComponent(canvasElement);
canvasCmp.resizeCanvas();
var ele2 = <HTMLInputElement>document.getElementById("popbutton");
var topbtn = <HTMLInputElement>document.getElementById("topbutton");
var isemptybtn = <HTMLInputElement>document.getElementById("isemptybutton");
var isfullbtn = <HTMLInputElement>document.getElementById("isfullbutton");
var restartbtn = <HTMLInputElement>document.getElementById("restartbutton");
var nextbtn = <HTMLInputElement>document.getElementById("nextbutton");
var stack = new Stack();
var insdiv: HTMLDivElement = <HTMLDivElement>document.getElementById("instructions");
var observation: HTMLDivElement = <HTMLDivElement>document.getElementById("Observation");
const ctx = canvasCmp.getContext();
var arrElmnts: element[] = new Array();
var arrNum: number[] = new Array();
var popElmnt: element[] = new Array();
var Top: number = -1;
ctx.lineWidth = 5;
ctx.strokeStyle = 'orange';

let temp, flag = 0;
let demoTopFlag: boolean = false, demoIsEmptyFlag: boolean = false, demoIsFullFlag: boolean = false;

function startStackDemo(){

    if(next<1)
        next=1;

    demoNext();
}

for (let p = 0; p < 10; p++) {
    flag = 0;
    while (flag != 1) {
        temp = Math.floor((Math.random() * 99) + 1);
        if (arrNum.indexOf(temp) == -1) {
            arrNum[p] = temp;
            flag = 1;
        }
    }
}

var elementWidth: number;
var elementHight: number;

var arrayStartX: number;
var arrayStartY: number;

function writeInstructionsStack(string: string, highlight?: boolean) {
    if (canvasCmp.width() < 550)
        insdiv.style.fontSize = "smaller"
    insdiv.innerHTML = string;
    if (highlight) {
        insdiv.style.color = "#000dff";
    }
    else {
        insdiv.style.color = "black";
    }
}
let limit = 10;
function myArray(count?: number) {
    arrayStartX = Math.floor(canvasCmp.width() * 0.1);
    arrayStartX % 2 == 0 ? arrayStartX : arrayStartX += 1
    arrayStartY = Math.floor(120);
    let i: number;
    let arrayXIndex = arrayStartX;
    elementWidth = Math.floor(stack.width * 0.85);
    elementWidth % 2 == 0 ? elementWidth : elementWidth += 1
    elementHight = Math.floor(stack.height / 4.5);
    ctx.font = "15px Georgia";
    //  console.warn("cnt= "+cnt);

    if (canvasCmp.width() < 449)
        limit = 5;
    else if (canvasCmp.width() < 550)
        limit = 6;
    else if (canvasCmp.width() < 650)
        limit = 7;
    else if (canvasCmp.width() < 750)
        limit = 8;
    else if (canvasCmp.width() < 850)
        limit = 9;
    for (i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvasCmp, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        if (i > cnt) {
            arrElmnts[i].writeData();
        }
        arrayXIndex += elementWidth;
    }
}
function myArray2(color) {
    ctx.strokeStyle = color
    let arrayXIndex = arrayStartX;
    for (let i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvasCmp, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        arrayXIndex += elementWidth;
    }
}
function stopArrayBlink() {
    ctx.strokeStyle = "orange"
    let arrayXIndex = arrayStartX;
    for (let i = 0; i < limit; i++) {
        arrElmnts[i] = new element(ctx, canvasCmp, arrayXIndex, arrayStartY, elementWidth, elementHight, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        arrayXIndex += elementWidth;
    }
    clearInterval(blinkArrID);
}

let blinkArrID: number
function blinkArray() {
    myArray2('blue');
    blinkArrID = setInterval(() => {
        myArray2('blue');
        setTimeout(() => {
            myArray2('red');
            // stopArrayBlink();
        }, 300);
    }, 700);
}
function demoRestart() {
    ctx.clearRect(1, 0, canvasCmp.width(), canvasCmp.height())
    instruction = "Click on the Push Button to Insert an Element in Stack";
    writeInstructionsStack(instruction, true)
    limit = 10
    ele.disabled = false
    topbtn.disabled = false
    isemptybtn.disabled = false
    isfullbtn.disabled = false
    restartbtn.disabled = false
    nextbtn.disabled = true
    ele2.disabled = false
    height = 30
    gap = 90;
    Top = -1

    popArrIndex = -1;
    stckElmnt = [];
    popElmnt = [];
    stp = stack.startX - 50;
    cnt = -1;
    ele.disabled = false
    poppedElements()
    topValueIndex()
    stack.myStack('red');
    myArray()
}
function demoIsEmpty() {
    demoTopFlag = false;
    demoIsEmptyFlag = true;
    demoIsFullFlag = false;
    // stopArrayBlink()
    clearpoppedElement()
    topValueIndex()
    stopBlinkStack();
    ctx.clearRect(stack.leftX + stack.width + 115, stack.leftY - (stack.height / 2), canvasCmp.width(), stack.height / 2)
    let pointX = canvasCmp.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;

    //  ctx.clearRect(635,250,canvasCmp.width(),120)

    //delete popped element
    ctx.font = "15px Georgia";
    ctx.fillStyle = "#000dff";

    if (canvasCmp.width() > 550)
        instruction = "isEmpty returns True if stack is empty else False.<br>" +
            "If stack is empty then top index will be -1.<br>" +
            "Current Top index:" + Top + ".<br>";
    else
        instruction = "isEmpty returns True if stack is empty else False." +
            "If stack is empty then top index will be -1." +
            "Current Top index:" + Top + ".";

    if (canvasCmp.width() > 550) {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
    }

    if (Top > -1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        //ctx.strokeRect(stckElmnt[Top].X-90,stckElmnt[Top].Y,stckElmnt[Top].width*6,stckElmnt[Top].height);
        ctx.strokeRect(stckElmnt[Top].X - 40, stckElmnt[Top].Y, stckElmnt[Top].width + 155, stckElmnt[Top].height);
        instruction += "isEmpty:False.";
    }
    else if (Top == -1) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "#000dff";
        instruction += "isEmpty:True.";
        blinkStack();
    }
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}
function demoIsFull() {
    demoTopFlag = false;
    demoIsEmptyFlag = false;
    demoIsFullFlag = true;
    // stopArrayBlink()
    clearpoppedElement()
    topValueIndex()
    stopBlinkStack();
    // ctx.clearRect(635,250,canvasCmp.width(),120)
    ctx.clearRect(stack.leftX + stack.width + 115, stack.leftY - (stack.height / 2), canvasCmp.width(), stack.height / 2)
    let pointX = canvasCmp.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;

    instruction = "isFull returns True if stack is full else False.";
    if (canvasCmp.width() > 550) {
        instruction += "</br>"
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
    }

    if (Top >= 0 && Top <= 3) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        if (Top != 3) {
            ctx.strokeRect(stckElmnt[Top].X - 40, stckElmnt[Top].Y, stckElmnt[Top].width + 155, stckElmnt[Top].height);
        }
        else if (Top == 3)
            blinkStack();
        ctx.font = "15px Georgia";
    }

    if (canvasCmp.width() > 550)
        instruction += "Here stack will be full when Top Index will be 3.<br>" +
            "Current Top Index is " + Top + ".<br>So ";
    else
        instruction += "Here stack will be full when Top Index will be 3.<br>" +
            "Current Top Index is " + Top + ".So ";

    ctx.font = "15px Georgia";
    ctx.fillStyle = "#000dff";
    Top == 3 ? instruction += " isFull:True" : instruction += " isFull:False";
    writeInstructionsStack(instruction, true);

    ctx.fillStyle = "black";
}
function demoTop() {
    demoTopFlag = true;
    demoIsEmptyFlag = false;
    demoIsFullFlag = false;
    clearpoppedElement();
    topValueIndex();
    stopBlinkStack();

    ctx.clearRect(stack.leftX + stack.width + 115, stack.leftY - (stack.height / 2), canvasCmp.width(), stack.height / 2)
    if (canvasCmp.width() > 550)
        instruction = "Top operation allows to see Top of Stack.<br>";
    else
        instruction = "Top operation allows to see Top of Stack.";



    if (Top > -1) {
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 5;
        ctx.strokeRect(stckElmnt[Top].X - 40, stckElmnt[Top].Y, stckElmnt[Top].width + 155, stckElmnt[Top].height);

        if (canvasCmp.width() > 550) {
            instruction += "Current Top index:" + Top + ".<br/>" +
                "Current Top index element:" + stckElmnt[Top].data + ".<br/>";
        }
        else
            instruction += "Current Top index:" + Top + "." +
                "Current Top index element:" + stckElmnt[Top].data + ".";
    }
    else {

        if (canvasCmp.width() > 550)
            instruction += "Stack is Empty.<br>" +
                "So current Top index:" + Top + ".";
        else
            instruction += "Stack is Empty." +
                "So current Top index:" + Top + ".";
        blinkStack();
    }
    let pointX = canvasCmp.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;

    if (canvasCmp.width() > 550) {
        instruction += "</br>"
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
    }
    else {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
    }
    writeInstructionsStack(instruction, true);
    ctx.fillStyle = "black";
}

let popArrIndex = -1;
let gap = 90;
async function singleElementDeleteStack(stckElmnt: element[], cnt: number) {
    let pointX = canvasCmp.width() * 0.4;
    let pointY = arrayStartY - arrayStartY * 0.55;
    var myreq;
    let popvalue;

    stckElmnt[Top].drawStackElement1();
    stack.myStack('red');

    stckElmnt[Top].y = Math.floor(stckElmnt[Top].y);
    for (let i = Top; i >= 0; i--) {
        stckElmnt[i].drawPrevElementStack();
    }
    if ((stckElmnt[Top].X == 2 || stckElmnt[Top].X == 2 + 1) && stckElmnt[Top].Y >= 184) {
        stckElmnt[Top].incrementY(2)

    }
    else if (stckElmnt[Top].Y > 184) {
        stckElmnt[Top].decrementY(2);

    }
    else if (stckElmnt[Top].X > 2) {
        stckElmnt[Top].decrementX(2)

    }
    else if (stckElmnt[Top].y <= 184) {
        stckElmnt[Top].incrementY(2);
    }

    let stoppop = Math.floor((canvasCmp.height() * 0.9) - 60)
    stoppop % 2 == 0 ? stoppop : stoppop += 1;

    if ((stckElmnt[Top].X == 2 || stckElmnt[Top].X == 2 + 1) && stckElmnt[Top].Y == stoppop) {
        if (canvasCmp.width() > 550) {
            popElmnt[++popArrIndex] = new element(ctx, canvasCmp, gap, canvasCmp.height() * 0.88, 50, 30, stckElmnt[Top].data);
            gap += 80
        }

        else {
            popElmnt[++popArrIndex] = new element(ctx, canvasCmp, gap, canvasCmp.height() * 0.88, 34, 30, stckElmnt[Top].data);
            gap += 35
        }

        popvalue = stckElmnt[Top].data
        Top--;

        if (Top > -1) {
            ctx.font = "13px Georgia";

            if (canvasCmp.width() > 550)
                instruction = "After popping element from Stack,Top index will be decreased by 1.<br>" +
                    "Current Top index:" + Top + "." +
                    "Current Top index element:" + stckElmnt[Top].data + ".";
            else
                instruction = "After popping element from Stack,Top index will be decreased by 1." +
                    "Current Top index element:" + stckElmnt[Top].data + ".";

            writeInstructionsStack(instruction, true);


            canvasCmp_arrow1(ctx, stckElmnt[Top].X + stckElmnt[Top].width + 5, stckElmnt[Top].Y + (30 / 2), stckElmnt[Top].X + stckElmnt[Top].width + 80, stckElmnt[Top].Y + (30 / 2));
            ctx.font = "15px Georgia";
            ctx.fillStyle = "black";
            ctx.fillText("Top", stckElmnt[Top].X + stckElmnt[Top].width + 85, stckElmnt[Top].Y + (30 / 2) + 5);
        }

        else {
            if (canvasCmp.width() > 550)
                instruction = "After popping element from Stack,Top index will be decreased by 1.<br>" +
                    "Current Top index:" + Top + ".<br>" +
                    "Stack is Empty.";
            else
                instruction = "After popping element from Stack,Top index will be decreased by 1." +
                    "Current Top index:" + Top + "." +
                    "Stack is Empty.";
            writeInstructionsStack(instruction, true);
        }
        ele2.disabled = false;
        topbtn.disabled = false
        ele.disabled = false
        isemptybtn.disabled = false
        isfullbtn.disabled = false
        topValueIndex()
        ctx.font = "13px Georgia";
        if (canvasCmp.width() > 550) {
            instruction += "</br>"
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
        }
        else {
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
        }
        return;
    }
    myreq = window.requestAnimationFrame(() => { this.singleElementDeleteStack(stckElmnt, cnt) });
}


async function demoPop() {
    // stopArrayBlink()
    demoTopFlag = false;
    demoIsEmptyFlag = false;
    demoIsFullFlag = false;
    clearpoppedElement()
    topValueIndex();
    stopBlinkStack();
    ctx.fillStyle = "black";
    ele2.disabled = true;
    ele.disabled = true
    topbtn.disabled = true
    isemptybtn.disabled = true
    isfullbtn.disabled = true;
    ctx.clearRect(arrayStartX, arrayStartY + elementHight + 2, canvasCmp.width(), canvasCmp.height());
    stack.myStack('red');

    for (let i = Top; i >= 0; i--) {
        stckElmnt[i].drawPrevElementStack();
        //  stckElmnt[i].writeData();
    }
    if (Top == -1) {
        //ctx.clearRect(100,0,740,115);
        /*  ctx.fillStyle = "rgba(0,0,0,0.1)";
         ctx.fillRect(240, 25, 550, 80);
         ctx.fillStyle = "#000dff";
         ctx.fillText("Current Top index is "+Top+".So Stack is Empty.",250,40);
         ctx.fillText("When a stack is empty(TOP = -1) and an element is tried to popped",250,60)
         ctx.fillText("from stack is called Stack underflow.",250,80); 
         ctx.fillStyle = "#150485";
         ctx.font="bold 13px Georgia";
         ctx.fillText("Push an element in stack to pop an element from Stack.",250,100) */
        if (canvasCmp.width() > 550)
            instruction = "Current Top index is " + Top + ".So Stack is Empty.<br/>" +
                "When a stack is empty(TOP = -1) and an element is tried to popped <br/>" +
                "from stack is called Stack underflow.<br>" +
                "Push an element in stack to pop that element from Stack.";
        else {

            instruction = "Current Top index is " + Top + ".So Stack is Empty." +
                "When a stack is empty(TOP = -1) and an element is tried to popped " +
                "from stack is called Stack underflow." +
                "Push an element in stack to pop that element from Stack.";
        }

        writeInstructionsStack(instruction, true);
        blinkStack();
        let pointX = canvasCmp.width() * 0.4;
        let pointY = arrayStartY - arrayStartY * 0.55;

        if (canvasCmp.width() > 550) {
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(pointX - 15, pointY - 18, 100, 70);
        }
        else {
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(pointX - 10, pointY - 15, 80, 70);
        }
        ctx.fillStyle = "black";
        ele2.disabled = false;
        ele.disabled = false
        topbtn.disabled = false
        isemptybtn.disabled = false
        isfullbtn.disabled = false
        return;
    }
    // canvasCmp_arrow(ctx,522,stckElmnt[Top].Y+(30/2),600,stckElmnt[Top].Y+(30/2));
    // ctx.stroke();


    //  ctx.font="15px Georgia";
    // ctx.fillText("Top",605,stckElmnt[Top].Y+(30/2)+5); 


    //canvasCmp_arrow(ctx,stack.rightX+5,stp+(30/2),stack.rightX+78,stp+(30/2));
    // canvasCmp_arrow1(ctx,stack.rightX+5,stp+(30/2),stack.rightX+78,stp+(30/2));

    /*   ctx.stroke();
      ctx.font="15px Georgia";
      ctx.fillText("Top",stack.rightX+80,stckElmnt[Top].Y+(30/2)+5);  */
    //ctx.clearRect(250,0,350,93);
    // ctx.clearRect(100,0,740,115);

    if (canvasCmp.width() > 550)
        instruction = "Current Top index is " + Top + " which will be used for Pop. <br/>" +
            "So index " + (Top) + " value will be popped from stack <br/>";
    else
        instruction = "Current Top index is " + Top + " which will be used for Pop." +
            "So index " + (Top) + " value will be popped from stack";
    writeInstructionsStack(instruction, true);
    await delayAnimationStack();



    ctx.fillStyle = "black";
    writeInstructionsStack(instruction);

    singleElementDeleteStack(stckElmnt, cnt);
}

let height = 30;
function singleElementInsertStack(stckElmnt: element[], stp: number, cnt: number, leftxfloor: number) {


    let stop = stp;
    var myreq;
    stckElmnt[Top].drawStackElement();

    canvasCmp_arrow1(ctx, stack.rightX + 5, stp + (30 / 2), stack.rightX + 78, stp + (30 / 2));
    ctx.font = "15px Georgia";
    ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);

    myArray(cnt);

    stack.myStack('red');
    let count = cnt;

    for (let i = 0; i < Top; i++) {
        stckElmnt[i].drawPrevElementStack();
    }


    if ((stckElmnt[Top].X >= leftxfloor) && (stckElmnt[Top].Y >= stp)) {
        ele.disabled = false;
        ele2.disabled = false
        topbtn.disabled = false
        isemptybtn.disabled = false
        isfullbtn.disabled = false
        return;
    }


    if (stckElmnt[Top].Y < 181)
        stckElmnt[Top].incrementY(2)
    else if (stckElmnt[Top].X < leftxfloor)
        stckElmnt[Top].incrementX(2)
    else if (stckElmnt[Top].X == leftxfloor && stckElmnt[Top].Y >= 137)
        stckElmnt[Top].incrementY(2)
    else if (stckElmnt[Top].X > leftxfloor)
        stckElmnt[Top].decrementX(2)


    //topValueIndex(); 
    myreq = window.requestAnimationFrame(() => { this.singleElementInsertStack(stckElmnt, stp, cnt, leftxfloor) });
}

function poppedElements() {

    ctx.clearRect(0, canvasCmp.height() * 0.85, canvasCmp.width(), canvasCmp.height());
    ctx.font = "bold 15px Georgia";
    ctx.fillText("Popped", 2, canvasCmp.height() * 0.90);
    ctx.fillText("Elements", 1, canvasCmp.height() * 0.94);
    for (let i = 0; i <= popArrIndex; i++) {
        popElmnt[i].drawPrevElementStack();
        // popElmnt[i].writeData();
    }
}
function canvasCmp_arrow1(context, fromx, fromy, tox, toy) {
    context.strokeStyle = "red"
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function canvasCmp_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}


let blinkIntervalIDStack: number
function blinkStack() {
    stack.myStack('blue');
    blinkElement();
    blinkIntervalIDStack = setInterval(() => {
        stack.myStack('blue');
        blinkElement();
        setTimeout(() => {
            stack.myStack('red');
            stopBlinkElement();
        }, 300);
    }, 700);
}

function stopBlinkStack() {
    stack.myStack("red");
    stopBlinkElement();
    clearInterval(blinkIntervalIDStack);
}
function blinkElement() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].drawPrevElementStack("blue");
        // stckElmnt[i].writeData();
    }
}
/*   function stackElementsData(){
    for(let i=0;i<=Top;i++){
        stckElmnt[i].writeData();
    } 
}*/
function stopBlinkElement() {
    for (let i = 0; i <= Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        // stckElmnt[i].writeData();
    }
}
function topValueIndex() {
    let pointX = canvasCmp.width() * 0.4;
    // console.log(canvasCmp.width())
    let pointY = arrayStartY - arrayStartY * 0.55;
    // let width=Math.floor(pointY-pointX)
    // ctx.clearRect(pointX,70,canvasCmp.width(),pointY-20);
    ctx.clearRect(pointX - 20, pointY - 19, canvasCmp.width(), pointY + 20);
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = 2
    ctx.fillStyle = "black";
    if (canvasCmp.width() > 550) {
        ctx.font = "bold 15px Georgia";
        ctx.strokeRect(pointX + 15, pointY + 10, 50, 35);
        ctx.fillText(Top + "", (pointX + 15) + (50 / 3), pointY + 30);
    }

    else {
        ctx.font = "bold 12px Georgia";
        //ctx.fillText(Top+"",pointX+15,pointY+30);
        ctx.strokeRect(pointX + 8, pointY + 10, 50, 35);
        ctx.fillText(Top + "", (pointX + 8) + (50 / 3), pointY + 30);
    }
    ctx.fillText("Top Index", pointX, pointY);
}


let stp = stack.startX - 50;


function delayAnimationStack() {
    return new Promise((resolve) => setTimeout(resolve, 4000));
}
function clearpoppedElement() {
    let stoppop = Math.floor((canvasCmp.height() * 0.9) - 60)
    stoppop % 2 == 0 ? stoppop : stoppop += 1
    ctx.lineWidth = 1
    ctx.clearRect(1, stoppop - 5, elementWidth + 5, elementHight + 5)
    // ctx.strokeRect(1,stoppop-5,elementWidth+5,elementHight+5)
}
async function demoPush(isResize?, number?) {
    demoTopFlag = false;
    demoIsEmptyFlag = false;
    demoIsFullFlag = false;

    clearpoppedElement()
    topValueIndex()
    stopBlinkStack();
    ele.disabled = true;
    ele2.disabled = true;
    topbtn.disabled = true
    isemptybtn.disabled = true
    isfullbtn.disabled = true
    if (cnt >= limit - 1) {

        instruction = "All the elements of Array are pushed in Stack.<br>Click Restart Button to Restart demonstration.";
        writeInstructionsStack(instruction, true);

        ctx.fillStyle = "black";
        ele.disabled = false;
        ele2.disabled = false;
        topbtn.disabled = false
        isemptybtn.disabled = false
        isfullbtn.disabled = false
        return;
    }
    else if (Top == 3) {
        // stp=stckElmnt[Top].Y-stckElmnt[Top-1].height

        ctx.clearRect(0, arrayStartY + elementHight + 2, canvasCmp.width(), canvasCmp.height());

        canvasCmp_arrow1(ctx, stack.rightX + 5, stckElmnt[Top].Y + (30 / 2), stack.rightX + 78, stckElmnt[Top].Y + (30 / 2));
        ctx.font = "15px Georgia";
        ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);

        if (canvasCmp.width() > 550)
            instruction = "Current Top index is " + Top + ".<br/>" +
                "So Stack is Full.<br/>" +
                "When stack is full and element is tried to be inserted in stack is called Stack Overflow.<br>" +
                "Pop an element from stack to push an element in Stack.";
        else
            instruction = "Current Top index is " + Top + "." +
                "So Stack is Full." +
                "When stack is full and element is tried to be inserted in stack is called Stack Overflow."
        "Pop an element from stack to push an element in Stack.";

        writeInstructionsStack(instruction, true);
        ctx.fillStyle = "black";
        ctx.font = "13px Georgia";
        blinkStack();
        ele.disabled = false;
        ele2.disabled = false;
        topbtn.disabled = false
        isemptybtn.disabled = false
        isfullbtn.disabled = false
        return;
    }
    ++cnt;
    ++Top;
    stp -= 30;


    ctx.clearRect(arrayStartX, (arrayStartY + elementWidth + 10), canvasCmp.width(), canvasCmp.height());
    stack.myStack('red');

    for (let i = 0; i < Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        //  stckElmnt[i].writeData();
    }

    ctx.clearRect(100, 0, 740, 115);

    if (canvasCmp.width() > 550)
        instruction = "For pushing an element increase top index by 1.<br/>" +
            "Previous top index:" + (Top - 1) + ".<br/>" +
            "After incrementing top index:" + Top + ".";
    else
        instruction = "For pushing an element increase top index by 1." +
            "Previous top index:" + (Top - 1) +
            ".After incrementing top index:" + Top + ".";
    writeInstructionsStack(instruction, true);


    ctx.fillStyle = "black";

    height += 30;
    if (!isResize) {
        stckElmnt[Top] = new element(ctx, canvasCmp, arrElmnts[cnt].X, arrElmnts[cnt].Y, stack.width * 0.85, stack.height / 4.5, arrNum[cnt]);
    } else {
        stckElmnt[number].drawPrevElementStack();
    }
    // let leftxfloor=Math.floor(stack.leftX)+Math.floor(stack.width*0.10)
    //leftxfloor%2==0?leftxfloor:leftxfloor+=1

    let leftxfloor = Math.floor(stack.startX) + ((stack.width - elementWidth) / 2)
    leftxfloor % 2 == 0 ? leftxfloor : leftxfloor += 1

    Top > 0 ? stp = stckElmnt[Top - 1].Y - stckElmnt[Top - 1].height : stp = stack.leftY - stckElmnt[Top].height - 3
    writeTop();
    topValueIndex()
    await delayAnimationStack();
    ctx.font = "13px Georgia";

    await delayAnimationStack();
    ctx.fillStyle = "black";

    if (canvasCmp.width() > 550)
        instruction += "<br>Now element " + arrNum[cnt] + " will be pushed at top index " + Top + ".";
    else
        instruction += "Now element " + arrNum[cnt] + " will be pushed at top index " + Top + ".";
    writeInstructionsStack(instruction);
    singleElementInsertStack(stckElmnt, stp, cnt, leftxfloor);

}
function writeTop(){
    ctx.lineWidth = 2;
    canvasCmp_arrow1(ctx, stack.rightX + 5, stp + (30 / 2), stack.rightX + 78, stp + (30 / 2));
    ctx.font = "15px Georgia";
    ctx.fillText("Top", stack.rightX + 80, stp + (30 / 2) + 5);
}

//skip intro set 11 to skip
let next = 0;
let pointX: number;
let pointY: number;
function StackExplanation() {
    ctx.clearRect(1, 1, canvasCmp.width(), canvasCmp.height())
    ctx.lineWidth = 2;
    ctx.font = "30px Georgia";
    ctx.fillStyle = "brown";
    ctx.fillText("Stack", canvasCmp.width() / 2 - 50, 50);
    if (canvasCmp.width() > 550)
        ctx.font = "20px Georgia";
    else
        ctx.font = "16px Georgia";
    ctx.fillStyle = "black";

    if (canvasCmp.width() > 550) {
        ctx.fillRect(50, 80, 8, 8);
        pointX = 100;
        pointY = 90;
        ctx.fillText("A Stack is a linear data structure that follows the principle of ", pointX, pointY);
        ctx.font = "small-caps bold 20px Georgia";
        ctx.fillText("Last In First Out(LIFO).", 643, 90);
        ctx.font = "20px Georgia";
        ctx.fillRect(50, 110, 8, 8);
        ctx.fillText("This means the last element inserted inside the stack is removed first.", 100, 120)
    }
    else {
        ctx.fillRect(10, 80, 8, 8);
        pointX = 25;
        pointY = 90;
        ctx.fillText("A Stack is a linear data structure that follows", pointX, pointY);
        ctx.fillText("the principle of ", pointX, pointY + 20);
        ctx.font = "small-caps bold 16px Georgia";
        ctx.fillText("Last In First Out(LIFO).", pointX, pointY + 40);
        ctx.font = "16px Georgia";
        ctx.fillRect(10, 150, 8, 8);
        ctx.fillText("This means the last element inserted", pointX, pointY + 70)
        ctx.fillText("inside the stack is removed first.", pointX, pointY + 90)

    }




    //++next;
}

function recalculateStackElementPoints() {
    for (let i = 0; i <= Top; i++) {
        //  console.warn("uuebr+ "+stack.startX);
        stckElmnt[i].x = Math.floor(stack.startX) + ((stack.width - elementWidth) / 2)
        stckElmnt[i].x % 2 == 0 ? stckElmnt[i].x : stckElmnt[i].x += 1;

        i > 0 ? stckElmnt[i].y = stckElmnt[i - 1].Y - stckElmnt[i - 1].height : stckElmnt[i].y = stack.leftY - stckElmnt[i].height - 3;

        stckElmnt[i].width = stack.width * 0.85;
        stckElmnt[i].height = stack.height / 4.5;

    }
}
function reDrawStackElements() {
    recalculateStackElementPoints();

    for (let i = 0; i <= Top; i++) {

        stckElmnt[i].drawPrevElementStack();

    }
}
function imagine() {
    if (canvasCmp.width() > 550) {
        ctx.fillStyle = "brown";
        ctx.font = "30px Georgia";
        ctx.fillText("Let's Imagine Stack", canvasCmp.width() / 2 - 140, 180)
    }
    else {
        ctx.fillStyle = "brown";
        ctx.font = "22px Georgia";
        ctx.fillText("Let's Imagine Stack", canvasCmp.width() / 2 - 100, pointY + 140)
    }

}
function Stack1() {
    let h = 337;
    pointX = canvasCmp.width() / 4;
    if (canvasCmp.width() < 550) {
        h = 400;
        pointX = canvasCmp.width() / 6;
    }

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointX, h - 100);
    ctx.lineTo(pointX, h + 40);
    ctx.lineTo(pointX + 100, h + 40);
    ctx.lineTo(pointX + 100, h - 100);
    ctx.stroke();

    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = "#ffff66";
        ctx.fillRect(pointX + 5, h, 90, 40)
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillText("Book " + (i + 1), pointX + 15, h + 33)
        h -= 45;
    }
    if (canvasCmp.width() > 550) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation similar to a pile of books", 150, 400)
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation ", canvasCmp.width() * 0.15, 460);
        ctx.fillText("similar to a pile of books", canvasCmp.width() * 0.13, 480);

    }

}
function Stack2() {
    let h = 360;
    pointX = canvasCmp.width() / 2 + 150;

    if (canvasCmp.width() < 550) {
        h = 430;
        pointX = canvasCmp.width() / 3 + 100;
    }

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();

    ctx.moveTo(pointX, h - 130);
    ctx.lineTo(pointX, h + 10);
    ctx.lineTo(pointX + 100, h + 10);
    ctx.lineTo(pointX + 100, h - 130);
    ctx.stroke();


    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        //ctx.lineWidth=0
        ctx.strokeStyle = "#ffff66";
        ctx.fillStyle = "#ffff66";
        ctx.ellipse(pointX + 50, h - 10, 50, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText("Plate " + (i + 1), pointX + 25, h)
        h -= 40;
    }
    if (canvasCmp.width() > 550) {
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation similar to a pile of plates", 600, 400);
    }
    else {

        ctx.font = "14px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Stack representation ", pointX, 460);
        ctx.fillText("similar to a ", pointX, 480);
        ctx.fillText("pile of plates", pointX, 500);


    }

}
function Stack3() {
    ctx.beginPath()
    if (canvasCmp.width() > 550) {
        ctx.moveTo((canvasCmp.width() / 10) + 100, 150)
        ctx.lineTo((canvasCmp.width() / 10) + 150, 150)
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 10) + 150, 150, (canvasCmp.width() / 10) + 150, 210)
        let h = 247;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvasCmp.width() / 10 + 100, 190);
        ctx.lineTo(canvasCmp.width() / 10 + 100, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 200, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 200, 190);
        ctx.stroke();
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvasCmp.width() / 10) + 105, 247, 90, 40)
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";
        ctx.fillText(1 + "", 190 + (190 / 3) + 5, h + 23)
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 1", 240, 400) //canvasCmpwidth=800
    }
    else {
        ctx.moveTo((canvasCmp.width() / 20) - 50, 200)
        ctx.lineTo((canvasCmp.width() / 20) + 50, 200)
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 20) + 50, 200, (canvasCmp.width() / 20) + 50, 230);
        let h = 247;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvasCmp.width() / 20, 220);
        ctx.lineTo(canvasCmp.width() / 20, 350);
        ctx.lineTo((canvasCmp.width() / 20) + 100, 350);
        ctx.lineTo((canvasCmp.width() / 20) + 100, 220);
        ctx.stroke();
        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvasCmp.width() / 20) + 5, 247, 90, 40)
        ctx.fillStyle = "Black";
        ctx.font = "18px Georgia";
        ctx.fillText(1 + "", (canvasCmp.width() / 20) + 20, h + 23)
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 1", (canvasCmp.width() / 20) + 25, h + 120);
    }

}
function Stack4() {
    ctx.beginPath()
    if (canvasCmp.width() > 550) {
        ctx.moveTo((canvasCmp.width() / 10) + 300, 150)
        ctx.lineTo((canvasCmp.width() / 10) + 350, 150)
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 10) + 350, 150, (canvasCmp.width() / 10) + 350, 210)
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvasCmp.width() / 10) + 300, 190);
        ctx.lineTo((canvasCmp.width() / 10) + 300, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 400, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 400, 190);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvasCmp.width() / 10) + 305, h, 90, 40)
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 454, h + 23)
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 2", (canvasCmp.width() / 10) + 335, 400);
    }
    else {
        ctx.moveTo((canvasCmp.width() / 20) + 180, 200);
        ctx.lineTo((canvasCmp.width() / 20) + 230, 200);
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 20) + 230, 200, (canvasCmp.width() / 20) + 230, 230)
        let h = 247 + 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvasCmp.width() / 20) + 180, 220);
        ctx.lineTo((canvasCmp.width() / 20) + 180, 350);
        ctx.lineTo((canvasCmp.width() / 20) + 280, 350);
        ctx.lineTo((canvasCmp.width() / 20) + 280, 220);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvasCmp.width() / 20) + 185, h, 90, 40)
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", (canvasCmp.width() / 20) + 200, h + 23)
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 2", (canvasCmp.width() / 20) + 205, h + 123 + 45);
    }

}
function Stack5() {
    ctx.beginPath();
    if (canvasCmp.width() > 550) {
        ctx.moveTo((canvasCmp.width() / 10) + 500, 150)
        ctx.lineTo((canvasCmp.width() / 10) + 550, 150)
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 10) + 550, 150, (canvasCmp.width() / 10) + 550, 210)
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvasCmp.width() / 10) + 500, 190);
        ctx.lineTo((canvasCmp.width() / 10) + 500, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 600, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 600, 190);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvasCmp.width() / 10) + 505, h, 90, 40)
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 654, h + 23)
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 3", (canvasCmp.width() / 10) + 535, 400);
    }
    else {
        ctx.moveTo((canvasCmp.width() / 20) - 50, 400)
        ctx.lineTo((canvasCmp.width() / 20) + 50, 400)
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 20) + 50, 400, (canvasCmp.width() / 20) + 50, 430)
        let h = 390 + 3 * 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvasCmp.width() / 20, 420);
        ctx.lineTo(canvasCmp.width() / 20, 570);
        ctx.lineTo((canvasCmp.width() / 20) + 100, 570);
        ctx.lineTo((canvasCmp.width() / 20) + 100, 420);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect(canvasCmp.width() / 20 + 5, h, 90, 40)
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", canvasCmp.width() / 20 + 20, h + 23)
            h -= 45;
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Push 3", canvasCmp.width() / 20 + 25, 585);

    }

}
function Stack6() {
    ctx.beginPath();
    if (canvasCmp.width() > 550) {
        ctx.moveTo(850, 175)
        ctx.lineTo(850, 150)
        ctx.stroke();
        canvasCmp_arrow1(ctx, 850, 150, 920, 150)
        let h = 337;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvasCmp.width() / 10) + 700, 190);
        ctx.lineTo((canvasCmp.width() / 10) + 700, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 800, 380);
        ctx.lineTo((canvasCmp.width() / 10) + 800, 190);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvasCmp.width() / 10) + 705, h, 90, 40)
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", 854, h + 23)
            h -= 45;
        }

        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvasCmp.width() / 10) + 705, 180, 90, 40)
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText(3 + "", 854, 203)
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Pop 3", (canvasCmp.width() / 10) + 735, 400);

    }
    else {
        ctx.moveTo((canvasCmp.width() / 20) + 230, 430);
        ctx.lineTo((canvasCmp.width() / 20) + 230, 400);
        ctx.stroke();
        canvasCmp_arrow1(ctx, (canvasCmp.width() / 20) + 230, 400, (canvasCmp.width() / 20) + 260, 400)
        let h = 390 + 3 * 45;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo((canvasCmp.width() / 20) + 180, 420);
        ctx.lineTo((canvasCmp.width() / 20) + 180, 570);
        ctx.lineTo((canvasCmp.width() / 20) + 280, 570);
        ctx.lineTo((canvasCmp.width() / 20) + 280, 420);
        ctx.stroke();
        for (let i = 0; i < 2; i++) {
            ctx.fillStyle = "#ffff66";
            ctx.fillRect((canvasCmp.width() / 20) + 185, h, 90, 40)
            ctx.fillStyle = "Black";
            ctx.font = "20px Georgia";
            ctx.fillText((i + 1) + "", (canvasCmp.width() / 20) + 200, h + 23)
            h -= 45;
        }

        ctx.fillStyle = "#ffff66";
        ctx.fillRect((canvasCmp.width() / 20) + 185, h - 15, 90, 40)
        ctx.font = "20px Georgia";
        ctx.fillStyle = "Black";
        ctx.fillText(3 + "", (canvasCmp.width() / 20) + 200, h + 13)
        ctx.font = "15px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("Pop 4", canvasCmp.width() / 20 + 205, 585)
    }

}
function Stacktop() {
    if (canvasCmp.width() > 550) {
        ctx.fillStyle = "Black";
        ctx.font = "20px Georgia";

        ctx.fillRect(50, 430, 8, 8);
        ctx.fillText("New book/plate can be added from top and top book/plate can be removed.", 100, 440);
        canvasCmp_arrow1(ctx, 400, 270, 460, 270);
        canvasCmp_arrow1(ctx, 860, 270, 940, 270);
        ctx.font = "17px Georgia";
        ctx.fillText("Top", 460, 275);
        ctx.fillText("Top", 940, 275);
    }
    else {
        ctx.fillStyle = "Black";
        ctx.font = "16px Georgia";

        ctx.fillRect(10, 530, 8, 8);
        ctx.fillText("New book/plate can be added from top ", 25, 540);
        ctx.fillText("and top book/plate can be removed.", 25, 560);

        canvasCmp_arrow1(ctx, 140, 330, 170, 330);
        canvasCmp_arrow1(ctx, 280, 330, 300, 330);
        ctx.font = "14px Georgia";
        ctx.fillText("Top", 170, 335);
        ctx.fillText("Top", 300, 335);
    }

}
function lifoprinciple() {
    if (canvasCmp.width() > 550) {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(50, 420, 8, 8);
        ctx.fillText("Here item3 was kept last,it was removed first.This is how the LIFO", 90, 430);
        ctx.fillText("(Last In First Out) Principle works.", 676, 430);
        ctx.lineWidth = 5
        ctx.strokeStyle = 'purple';
        ctx.strokeRect((canvasCmp.width() / 10) + 505, 250, 90, 40);
        ctx.strokeRect((canvasCmp.width() / 10) + 705, 180, 90, 40);
    }
    else {
        ctx.font = "14px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(10, 610, 8, 8);
        ctx.fillText("Here item3 was kept last,it was removed first", 25, 610);
        ctx.fillText("This is how the LIFO Principle works.", 25, 630);
        ctx.lineWidth = 5
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(canvasCmp.width() / 20 + 5, 390 + 45, 90, 40);
        ctx.strokeRect((canvasCmp.width() / 20) + 185, 390 + 33, 90, 40);
    }

}
function principle() {
    ctx.clearRect(1, 1, canvasCmp.width(), canvasCmp.height())

    if (canvasCmp.width() > 550) {
        ctx.font = "30px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("LIFO Principle of Stack", canvasCmp.width() / 3, 50)
        ctx.font = "20px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(50, 80, 8, 8);
        ctx.fillText("Putting an item on top of stack is called ", 90, 90);
        ctx.font = "bold 21px Georgia"
        ctx.fillText("push", 441, 90);
        ctx.font = "20px Georgia";
        ctx.fillText("and removing an item is called", 500, 90)
        ctx.font = "bold 21px Georgia"
        ctx.fillText("pop.", 775, 90);
        ctx.font = "20px Georgia";
        ctx.fillText("Let's Push and Pop in Stack.", 90, 120)
    }
    else {
        ctx.font = "20px Georgia";
        ctx.fillStyle = "brown";
        ctx.fillText("LIFO Principle of Stack", 30, 50)
        ctx.font = "16px Georgia";
        ctx.fillStyle = "black";
        ctx.fillRect(10, 80, 8, 8);
        ctx.fillText("Putting an item on top of stack is called ", 25, 90);
        ctx.font = "bold 17px Georgia"
        ctx.fillText("push", 25, 110);
        ctx.font = "16px Georgia";
        ctx.fillText("and removing an item is called", 25, 130)
        ctx.font = "bold 17px Georgia"
        ctx.fillText("pop.", 25, 150);
        ctx.font = "16px Georgia";
        ctx.fillText("Let's Push and Pop in Stack.", 25, 180)
    }
}
let instructionXPoint: number;
let instruction: string;
function basicoperation() {

    instructionXPoint = Math.floor(canvasCmp.width() * 0.1);;
    ctx.clearRect(1, 1, canvasCmp.width(), canvasCmp.height())
    poppedElements()
    ctx.font = "30px Georgia";
    ctx.
        font = "13px Georgia";
    instruction = "Array and Stack are given.Elements from Array can be inserted inside Stack.";
    if (canvasCmp.width() > 550)
        instruction += "<br>";
    instruction += "Basic Stack operations can be performed.";
    if (canvasCmp.width() > 550)
        instruction += "<br>";
    instruction += "Click on the Push Button to Insert an Element in Stack.";
    writeInstructionsStack(instruction, true);

    ctx.fillStyle = "black";
    stack.myStack('red');
    recalculateStackElementPoints();
    myArray();
    topValueIndex();


    ele.disabled = false
    ele2.disabled = false
    topbtn.disabled = false
    isemptybtn.disabled = false
    isfullbtn.disabled = false
    restartbtn.disabled = false
    nextbtn.disabled = true
    reDrawStackElements();
}
function demoNext() {

    if (demoTopFlag){
        stack.myStack('red');
        recalculateStackElementPoints();
        myArray();
        topValueIndex();
        demoTop();
        writeTop();

    }
    else if (demoIsEmptyFlag){
        stack.myStack('red');
        recalculateStackElementPoints();
        myArray();
        topValueIndex();
        demoIsEmpty();
        writeTop();

    }
    else if (demoIsFullFlag){
        stack.myStack('red');
        recalculateStackElementPoints();
        myArray();
        topValueIndex();
        demoIsFull();
        writeTop();

    }
    else {
        switch (next) {
            case 1: StackExplanation()
                document.getElementById("firstpg_aboveImage").style.display = "block";
                nextbtn.value = "Next";
                ++next;
                break;
            case 2: imagine()
                document.getElementById("firstpg_LetsImagine").style.display = "block";
    
                ++next;
                break;
            case 3: Stack1()
                document.getElementById("firstpg_Image1").style.display = "block";
                document.getElementById("firstpg_Image2").style.display = "block";
    
                ++next;
                break;
            case 4: Stack2()
    
                document.getElementById("firstpg_Image1").setAttribute("src", "../images/3_first.png");
                document.getElementById("firstpg_Image2").setAttribute("src", "../images/4_first.png");
    
                document.getElementById("firstpg_afterImage").style.display = "block";
    
                ++next;
                break;
            case 5: Stacktop();
    
                document.getElementById("firstpg_aboveImage").style.display = "none";
                document.getElementById("firstpg_LetsImagine").style.display = "none";
                document.getElementById("firstpg_Image1").style.display = "none";
                document.getElementById("firstpg_Image2").style.display = "none";
                document.getElementById("firstpg_afterImage").style.display = "none";
    
    
                document.getElementById("secondpg_beforeImage").style.display = "block";
    
                ++next;
                break;
            case 6: principle()
                document.getElementById("secondpg_Image1").style.display = "block";
                document.getElementById("secondpg_Image2").style.display = "block";
    
                ++next;
                break;
            case 7: Stack3();
                document.getElementById("secondpg_afterImage").style.display = "block";
                document.getElementById("secondpg_Image2").setAttribute("src", "../images/2ndpage_3rd.png");
    
                ++next;
                break;
    
            case 8:
                document.getElementById("secondpg_beforeImage").style.display = "none";
                document.getElementById("secondpg_Image1").style.display = "none";
                document.getElementById("secondpg_Image2").style.display = "none";
                document.getElementById("secondpg_afterImage").style.display = "none";
                document.getElementById("canvas").style.display = "block";
                document.getElementById("Observation").style.display = "block";
                document.getElementById("instructions").style.display = "block";
                stack.myStack('red');
                basicoperation();
                ++next;
                break;
        }
    }
    
}

ele.disabled = true;
ele2.disabled = true;
topbtn.disabled = true
isemptybtn.disabled = true
isfullbtn.disabled = true
restartbtn.disabled = true

if (canvasCmp.width() > 550) {
    ctx.font = "20px Georgia";

    ctx.fillText("Click on Start button to start the demonstration", canvasCmp.width() / 3, 50);
}
else {
    ctx.font = "15px Georgia";

    ctx.fillText("Click on Start button to start the demonstration", 10, 50);
}

++next;


