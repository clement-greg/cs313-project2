var flyingObject = function () {
    this.outline = [];
    this.point = new point();
    this.rotation = 0;
    this.velocity = new velocity(0, 0);
    this.alive = true;
    this.collisionRadius = 0;
    this.destroyPoints = 0;
};

flyingObject.prototype.pointCenterOffsetX = 0;
flyingObject.prototype.pointCenterOffsetY = 0;

flyingObject.prototype.draw = function () {
    if (!this.alive)
        return;
    this.drawPoints(this.outline);
};

flyingObject.prototype.drawPoints = function (points) {
    gameArgs.drawPoints(points, this.point, this.rotation);
};

flyingObject.prototype.kill = function () {
    this.alive = false;
}

flyingObject.prototype.advance = function () {
    this.point.x = this.point.x + this.velocity.dx;
    this.point.y = this.point.y + this.velocity.dy;
};

flyingObject.prototype.getObjectBounds = function () {
    var maxX = 0;
    var minX = 0;
    var maxY = 0;
     var minY = 0;

    for (var i = 0; i < this.outline.length; i++) {
        var p = this.outline[i];
        if (p.x > maxX)
            maxX = p.x;
        if (p.x < minX)
            minX = p.x;
        if (p.y > maxY)
            maxY = p.y;
        if (p.y < minY)
            minY = p.y;
    }

    return [
        new point(this.point.x + minX, this.point.y + minY),
        new point(this.point.x + maxX, this.point.y + maxY)
    ];
};
