var point = function (x, y) {
    this.x = x;
    this.y = y;
};

point.prototype.resetToBounds = function () {
    if (this.y < 10) 
        this.y = 10;
}
