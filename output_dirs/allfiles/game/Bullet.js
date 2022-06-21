class Bullet {
    constructor(canvas, ctx, id) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.img = bulletImg;
        this.velocity = new Point(0, -3);
        this.pt = new Point(planeObj.pt.x + (planeObj.img.width * 0.9), planeObj.pt.y - planeObj.img.height * 1.3);
        this.id = id;
        this.isAlive = true;
    }
    update() {
        this.pt.x = this.pt.x + this.velocity.x;
        this.pt.y = this.pt.y + this.velocity.y;
        updateCanvas();
        this.draw();
        writeTime();
        if (!this.isAlive) {
            return;
        }
        window.requestAnimationFrame(() => {
            this.update();
        });
    }
    draw() {
        this.ctx.drawImage(this.img, this.pt.x, this.pt.y);
    }
}
//# sourceMappingURL=Bullet.js.map