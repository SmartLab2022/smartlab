mainDeletion();
// generateTree();
// drawBinaryTree(root, canvas);
// listOfNodes(root);

window.onresize = () => {
	if (window.innerWidth < 1300)
		drawBinaryTree(root, canvas);
}

const searchInputValue: HTMLInputElement = <HTMLInputElement>document.getElementById("searchvalue");
const btnSearch: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnSearch")
const searchHint: HTMLDivElement = <HTMLDivElement>document.getElementById("searchHint");
const searchOrder: HTMLDivElement = <HTMLDivElement>document.getElementById("searchOrder");
var searchValue: number;
btnSearch.onclick = searchNode;

searchInputValue.focus()


function writeInstructionForSearch(node1: BinarySearchTreeNode) {
	if (searchValue < node1.value && node1.left == null && node1.right == null) {
		searchHint.innerHTML = "Left & Right Subtree is Empty ";
	}
	else if (searchValue < node1.value && node1.left != null) {
		searchHint.innerHTML = searchValue + " is less than " + node1.value + "  So will move to left subtree";
	}

	else if (searchValue < node1.value && node1.left == null) {
		searchHint.innerHTML = "Left Subtree is Empty ";
	}
	else if (searchValue > node1.value && node1.right != null) {
		searchHint.innerHTML = searchValue + " is greater than " + node1.value + "  So will move to right subtree";
	}
	else if (searchValue > node1.value && node1.right == null) {
		searchHint.innerHTML = "Right Subtree is Empty";
	}
	else if (searchValue === node1.value) {
		searchHint.innerHTML = "Node Found"
		searchInputValue.value = ''
		searchInputValue.focus()
	} else {
		searchHint.innerHTML = "IN ELSE BLOCK"
	}
}

function animateNode(node: BinarySearchTreeNode) {
	node.nodeCircle.setNodeColor(FIXED_VALUE.animateBorderColor, FIXED_VALUE.animateFillColor, FIXED_VALUE.animateTextColor);
	node.nodeCircle.draw(canvasComponent);
	searchOrder.innerHTML += node.value + "\t"
	writeInstructionForSearch(node);
	return new Promise((resolve) => setTimeout(resolve, 1500));
}
function restoreMyCircle(node) {
	node.nodeCircle.setDefault();
	node.nodeCircle.draw(canvasComponent);
}

async function searchNode() {
	removeAllNodeValue();
	searchOrder.innerHTML = "Path : "
	var myroot = root;
	var flag = false;

	searchValue = +(searchInputValue.value);
	while (myroot != null) {
		await animateNode(myroot);
		restoreMyCircle(myroot)
		if (myroot.value === searchValue) {
			flag = true;
			break;
		} else if (searchValue < myroot.value) {
			myroot = myroot.left;
		} else if (searchValue > myroot.value) {
			myroot = myroot.right
		}
	}
	if (!flag) {
		searchHint.innerHTML = "Node Not Found"
		searchInputValue.value = ''
		searchInputValue.focus()
	}

}
