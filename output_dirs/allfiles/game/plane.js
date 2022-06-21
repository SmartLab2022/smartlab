class Plane {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = plane;
        this.pt = new Point(canvas.width / 2 - (this.img.width + 5), canvas.height - (plane.height * 2.5));
        this.velocity = new Point(0, 0);
    }
    update() {
        // console.warn("y= "+this.pt.y);
        this.pt.x = this.pt.x + this.velocity.x;
        this.pt.y = this.pt.y + this.velocity.y;
        updateCanvas();
        this.draw();
    }
    draw() {
        gameContext.drawImage(plane, this.pt.x, this.pt.y, plane.width * 2.2, plane.height * 2.2);
    }
}
//# sourceMappingURL=plane.js.map