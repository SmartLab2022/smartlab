var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
canvasComponent.resizeCanvas();
window.onresize = () => {
    if (window.innerWidth < 1300)
        drawBinaryTree(root, canvas);
};
const insertInputValue = document.getElementById("insertvalue");
const btnInsert = document.getElementById("btnInsert");
const insertHint = document.getElementById('insertHint');
// var insertValue : number;
var treeHeight = 1;
var arrayOfNode = [];
insertInputValue.focus();
btnInsert.onclick = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(root.getHeight())
        btnInsert.disabled = true;
        var insertValue = insertInputValue.value;
        if (insertValue.includes('.')) {
            alert('Please Enter Integer value');
        }
        else if (insertValue == "") {
            alert("Please Enter the value");
        }
        else if (isNaN(+insertValue)) {
            alert("Please Enter Integer value");
        }
        else if ((+insertValue) < 0) {
            alert("Plese enter positive value");
        }
        else if ((+insertValue) > 100) {
            alert("Plese enter value between 0 to 100");
        }
        else {
            yield insertNodeWithAnimation(+insertValue);
        }
        insertInputValue.value = "";
        insertInputValue.focus();
        btnInsert.disabled = false;
    });
};
function restoreInsertCircle(node) {
    node.nodeCircle.setDefault();
    node.nodeCircle.draw(canvasComponent);
}
function animateInsertNode(node) {
    node.nodeCircle.setNodeColor(FIXED_VALUE.animateBorderColor, FIXED_VALUE.animateFillColor, FIXED_VALUE.animateTextColor);
    node.nodeCircle.draw(canvasComponent);
    return new Promise((resolve) => setTimeout(resolve, 1500));
}
function setInstructionForInsertNode(node, data, isInsertable) {
    if (node == null) {
        insertHint.innerHTML = "Tree is Empty So " + data + " is root of the tree..";
    }
    else if (data == node.value) {
        insertHint.innerHTML = "duplicate is not allowed in tree ";
    }
    else if (data < node.value) {
        if (isInsertable) {
            insertHint.innerHTML = data + " is less than " + node.value + " And Left is Null. <br/>" + " So added to left subtree";
        }
        else {
            insertHint.innerHTML = data + " is less than " + node.value + " so will move to left subtree";
        }
    }
    else if (data > node.value) {
        if (isInsertable) {
            insertHint.innerHTML = data + " is greater than " + node.value + " And Right is Null. <br/>" + " So added to right subtree";
        }
        else {
            insertHint.innerHTML = data + " is greater than " + node.value + " so will move to right subtree";
        }
    }
}
var myroot = root;
function insertNodeWithAnimation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var height = heightOfTree(myroot, data);
        if (height > 5) {
            alert("Max Level Support is 5 ");
            return;
        }
        if (myroot == null) {
            // setLevelOfNode(new BinarySearchTreeNode(data));
            insertNode(data);
            drawBinaryTree(root, canvas);
            setInstructionForInsertNode(myroot, data);
            myroot = root;
            yield animateInsertNode(myroot);
            restoreInsertCircle(myroot);
        }
        else {
            while (myroot != null) {
                if (data < myroot.value) {
                    if (myroot.left == undefined)
                        setInstructionForInsertNode(myroot, data, true);
                    else
                        setInstructionForInsertNode(myroot, data, false);
                }
                else if (data > myroot.value) {
                    if (myroot.right == undefined)
                        setInstructionForInsertNode(myroot, data, true);
                    else
                        setInstructionForInsertNode(myroot, data, false);
                }
                else {
                    setInstructionForInsertNode(myroot, data, false);
                }
                yield animateInsertNode(myroot);
                restoreInsertCircle(myroot);
                if (myroot.value == data) {
                    return;
                }
                else if (data < myroot.value) {
                    myroot = myroot.left;
                }
                else if (data > myroot.value) {
                    myroot = myroot.right;
                }
            }
            // setLevelOfNode(new BinarySearchTreeNode(data))
            myroot = root;
            insertNode(data);
            drawBinaryTree(root, canvas);
        }
    });
}
// function setLevelOfNode(node){
// 	// console.log("Called in Set Node");
// 	var height = 1;
// 	var local_root = root;
// 	if(root == null){
// 		node.level = 1;
// 		height++;
// 	}else{
// 		while(local_root != null){
// 			// console.log(local_root)
// 			if(local_root.value == node.value){
// 				break;
// 			}else if(node.value < local_root.value){
// 				height++;
// 				local_root = local_root.left;
// 			}
// 			else if(node.value > local_root.value){
// 				height++;
// 				local_root = local_root.right;
// 			}
// 		}
// 	}
// 	node.level = height;
// 	arrayOfNode.push(node);
// }
function heightOfTree(node, data) {
    var height = 1;
    while (node != null) {
        if (node.value == data)
            return height;
        else if (data < node.value) {
            height = height + 1;
            node = node.left;
        }
        else if (data > node.value) {
            height = height + 1;
            node = node.right;
        }
    }
    return height;
}
//# sourceMappingURL=InsertDemo.js.map