var pill = function (ctx, point, powerUp) {
    flyingObject.call(this, ctx);
    this.point = point;
    this.outline = [
        { x: -7, y: -7 },
        { x: 7, y: -7 },
        { x: 7, y: 7 },
        { x: -7, y: 7 },
        { x: -7, y: -7 },
    ];
    this.powerUp = powerUp;
};

pill.prototype = Object.create(flyingObject.prototype);

pill.constructor = pill;

pill.prototype.pillDrawn = false;

pill.prototype.draw = function () {
    //flyingObject.prototype.draw.call(this);
    var ctx = gameArgs.getContext();

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(this.point.x, this.point.y);

    var turnAngle = .3;
    if (this.direction == 'left')
        turnAngle = 180;
    else if (this.direction == 'up')
        turnAngle = -1.2;
    else if (this.direction == 'down')
        turnAngle = 90;

    ctx.arc(this.point.x, this.point.y, this.powerUp ? 10 : 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
   
}