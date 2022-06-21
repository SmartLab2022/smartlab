class StkButton {
    constructor(context, startp, height, width, arcsize) {
        this.color = "#b808f7";
        this.context = context;
        this.startp = startp;
        this.height = height;
        this.width = width;
        this.arcsize = arcsize;
    }
    setColor(color) {
        this.color = color;
    }
    draw() {
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
        this.write_climb();
    }
    isInside(pt) {
        if (pt.x > this.startp.x && pt.x < (this.startp.x + this.width) && pt.y > this.startp.y && pt.y < (this.startp.y + this.height))
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
    write_climb() {
        this.context.font = "bold 20px Arial";
        this.context.fillStyle = "Black";
        this.context.fillText("CLIMB", this.startp.x + 20, this.startp.y + 60);
    }
}
//# sourceMappingURL=StackButton.js.map