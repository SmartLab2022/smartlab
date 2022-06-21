 class Stack{
     startX:number;
     startY:number;
     leftX:number;
     leftY:number;
     width:number;
     height:number;
     rightX:number
     indexYpt:number;

     Stacktext(x,y){
        ctx.font="bold 15px Georgia";
        ctx.fillStyle="black"
       ctx.clearRect(x,this.leftY+2,60,20)
        ctx.fillText("Stack",x,y);
     }
           
     myStack(color){
         this.startX=Math.floor(canvasCmp.width()/2-canvasCmp.width()/10.1)
         this.startX%2==0?this.startX:this.startX+=1
         
         this.startY=canvasCmp.height()/2
         this.leftX= this.startX;
         this.leftY= this.startY+(canvasCmp.height()/3.413533834586466);
      
        if(canvasCmp.width()<450){
          this.rightX= Math.floor(this.startX+(canvasCmp.width()/6));  
        }
            
        else if(canvasCmp.width()<550){
            this.rightX= Math.floor(this.startX+(canvasCmp.width()/7));
        }
            
        else if(canvasCmp.width()<650){
            this.rightX= Math.floor(this.startX+(canvasCmp.width()/8));
        }
            
        else if(canvasCmp.width()<750){
            this.rightX= Math.floor(this.startX+(canvasCmp.width()/9));
          }
            
        else if(canvasCmp.width()<850){
            this.rightX= Math.floor(this.startX+(canvasCmp.width()/10));
       }
           
        else if(canvasCmp.width()<950){
            this.rightX= Math.floor(this.startX+(canvasCmp.width()/11));
        }
            
        else if(canvasCmp.width()<1050){
           this.rightX= Math.floor(this.startX+(canvasCmp.width()/12));
        }
            
        else   {
             this.rightX= Math.floor(this.startX+(canvasCmp.width()/13));
        }         
           
      this.rightX%2==0?this.rightX:this.rightX+=1
        var rightY= this.leftY;
        var toprightX=this.rightX;
        var toprightY= this.startY
        ctx.strokeStyle =color;
        ctx.lineWidth = 4;

        this.width=this.rightX-this.leftX;
        this.height=rightY-this.startY;
        if(canvasCmp.width()>370)
        this.Stacktext((((this.startX+(this.width/2))-(this.width*0.3))),this.leftY+20);
        else if(canvasCmp.width()<300)
        this.Stacktext((((this.startX+(this.width/2))-(this.width*0.45))),this.leftY+20);
        else
        this.Stacktext((((this.startX+(this.width/2))-(this.width*0.4))),this.leftY+20);
      
        ctx.beginPath();
         ctx.moveTo( this.startX, this.startY);
        ctx.lineTo( this.leftX, this.leftY);
        ctx.lineTo(this.rightX,rightY);
        ctx.lineTo(toprightX,toprightY);
        ctx.stroke();
      
        ctx.font="15px Georgia";
        ctx.fillStyle="black"
        this.indexYpt=this.leftY-((Math.floor(stack.height/4.5))/2.5);
        for(let i=0;i<4;i++){
            ctx.fillText(i+"",this.leftX-20,this.indexYpt)
            this.indexYpt-=Math.floor(stack.height/4.5);
        }
        ctx.fillStyle = "black";
        poppedElements();

    }
 }
 