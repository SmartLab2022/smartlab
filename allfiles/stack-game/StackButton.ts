class StkButton {
    private context: CanvasRenderingContext2D;
    private startp: Point;
    private height: number;
    private width: number;
    private arcsize: number;
    private color: string = "#b808f7";
    
    constructor(context: CanvasRenderingContext2D, startp: Point, height: number, width: number, arcsize: number) {
        this.context = context;
        this.startp = startp;
        this.height = height;
        this.width = width;
        this.arcsize = arcsize;
    }
    
    setColor(color: string) {
        this.color = color;
    }
    
    draw() 
    {
      
        this.context.beginPath();
        this.context.moveTo(this.startp.x + this.arcsize, this.startp.y);
        this.context.lineTo(this.startp.x + this.width - this.arcsize, this.startp.y);
        this.context.arcTo(this.startp.x + this.width, this.startp.y, this.startp.x + this.width, this.startp.y + this.arcsize, this.arcsize);
        this.context.lineTo(this.startp.x + this.width, this.startp.y + this.height - this.arcsize);
        this.context.arcTo(this.startp.x + this.width, this.startp.y + this.height, this.startp.x + this.width - this.arcsize, this.startp.y + this.height, this.arcsize);
        this.context.lineTo(this.startp.x + this.arcsize, this.startp.y + this.height);
        this.context.arcTo(this.startp.x, this.startp.y + this.height, this.startp.x, this.startp.y - this.arcsize, this.arcsize);
        this.context.lineTo(this.startp.x, this.startp.y + this.arcsize);
        this.context.arcTo(this.startp.x, this.startp.y, this.startp.x + this.arcsize, this.startp.y, this.arcsize);
        this.context.lineTo(this.startp.x + this.arcsize, this.startp.y);
        
        this.context.fillStyle = this.color;
        this.context.fill();
        this.write_climb()
    }
    
    isInside(pt: Point): boolean 
    {
        if(pt.x > this.startp.x && pt.x < (this.startp.x + this.width) && pt.y > this.startp.y && pt.y < (this.startp.y + this.height)) 
        return true;
        
        else 
            return false;
    }
   /*write_num(num:number)
    {
        this.context.font="16px Arial";
        this.context.fillStyle="White";
        this.context.fillText(num.toString(),this.startp.x+12,this.startp.y+25);
    }*/
    write_climb()
    {
        this.context.font="bold 20px Arial";
        this.context.fillStyle="Black";
        this.context.fillText("CLIMB",this.startp.x+20,this.startp.y+60);
    }
    /* write_result()
    {
        this.context.font="28px Arial";
        this.context.fillStyle="White";
        this.context.fillText("RESULT",this.startp.x+25,this.startp.y+35);
    }
    
    write_next()
    {
        this.context.font="25px Arial";
        this.context.fillStyle="White";
        this.context.fillText("NEXT",this.startp.x+60,this.startp.y+35);
    }
    write_learn_more()
    {
        this.context.font="20px Arial";
        this.context.fillStyle="White";
        this.context.fillText("LERN MORE",this.startp.x+10,this.startp.y+45);
    }
    write_return()
    {
        this.context.font="28px Arial";
        this.context.fillStyle="White";
        this.context.fillText("RETURN",this.startp.x+18,this.startp.y+45);
    } */
}