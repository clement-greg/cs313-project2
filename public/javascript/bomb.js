var bomb = function (ctx) {
    flyingObject.call(this);
    this.outline = [];
    this.point = new point();
    this.rotation = 0;
    this.velocity = new velocity(0,0);
    this.alive = true;
    this.collisionRadius = 0;
    this.destroyPoints = 0;
    this.outline = [
        { x: 0, y: 0 },
        { x: 60, y: 0 },
        { x: 60, y: 82 },
        { x: 0, y: 82 },
        { x: 0, y: 0 },
    ];
};

bomb.prototype = Object.create(flyingObject.prototype);
bomb.prototype.pointCenterOffsetX = 30;
bomb.prototype.pointCenterOffsetY = 82;



bomb.prototype.draw = function () {
    if (!this.alive){
        return;
    }

    var gameCanvas = document.getElementById("gameCanvas");


    var ctx = gameCanvas.getContext("2d");
    gameArgs.drawImage(document.getElementById('bomb-img'), this.point.x, this.point.y, ctx);
    // var ctx = gameArgs.getContext();
    // ctx.strokeStyle = '#fff';
    // ctx.moveTo(this.point.x, this.point.y);
    
    // ctx.lineTo(this.point.x + 60, this.point.y);
    // ctx.lineTo(this.point.x + 60, this.point.y + 82);
    // ctx.lineTo(this.point.x, this.point.y + 82);
    // ctx.lineTo(this.point.x, this.point.y);

    // ctx.stroke();
};