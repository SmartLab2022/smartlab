    
function drawBinaryTree(
    root: BinarySearchTreeNode,
    canvasElement: HTMLCanvasElement,
    isGameTree:boolean =  false
) {
 
   
    var isInsert : boolean = false;
    var path = window.location.pathname;
    var nameOfPage = path.split("/").pop()
    
    
    var maxHeight = document.body.clientHeight * 0.65;
    var maxWidth =  document.body.clientWidth * 0.80;

  
    	drawSimpleBinaryTree(root, canvasElement,maxHeight,maxWidth,isGameTree);	

}


