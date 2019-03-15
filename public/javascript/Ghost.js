var ghost = function (ctx, point, color, board, speed) {
    moveablePlayer.call(this, ctx);
    this.point = point;
    this.outline = [
        { x: 0, y: 0 },
        { x: 36, y: 0 },
        { x: 36, y: 45 },
        { x: 0, y: 45 },
        { x: 0, y: 0 },
    ];
    this.color = color;
    this.board = board;
    this.speed = speed;
    this.verticalAdjustPadding = 25;
    this.horizontalAdjustPadding = 25;

    this.bottomCheckPadding = 24;
    this.topCheckPadding = 28;
    this.leftCheckPadding = 28;
    this.rightCheckPadding = 24;
    this.bottomPadding = 25;
};

ghost.prototype = Object.create(moveablePlayer.prototype);

ghost.constructor = ghost;

ghost.prototype.sendingOut = false;
ghost.prototype.sendOut = function () {
    this.sendingOut = true;
    this.eatable = false;
}

ghost.prototype.lastTurn = new Date();
ghost.prototype.eatable = false;
ghost.prototype.advance = function () {

    if (this.sendingOut) {
        this.point.y -= 4;
        if (this.point.y < 380) {
            var goRight = Math.floor(Math.random() * 2);
            if (goRight) {
                this.goForward();
            }
            else
                this.goBackward();

            this.sendingOut = false;

            return;
        }
    }

    else if (this.resetting) {
        if (this.point.x > 382)
            this.point.x -= 2;
        else if (this.point.x < 382)
            this.point.x += 2;

        if (Math.abs(this.point.x - 382) < 4)
            this.point.x = 382;

        if (this.point.y > 430)
            this.point.y -= this.speed;
        if (this.point.y < 430)
            this.point.y += this.speed;
        if (Math.abs(this.point.y - 430) < 4)
            this.point.y = 430;

        if (this.point.x == 382 && this.point.y == 430) {
            var thisItem = this;
            this.resetting = false;
            setTimeout(function () { thisItem.sendOut(); }, 3000);
            //this.sendOut();
        }
        return;
    }

    var turnThrottle = 1000;
    var canGoRight = this.canGoRight();
    var canGoLeft = this.canGoLeft();
    var canGoUp = this.canGoUp();
    var canGoDown = this.canGoDown();
    var originalDirection = this.direction;
    var possibleDirections = [];

    if (this.direction == 'right' && ((new Date() - this.lastTurn) > turnThrottle)) {
        if (!canGoRight && canGoLeft)
            possibleDirections.push(this.goBackward);
        if (canGoUp)
            possibleDirections.push(this.goUp);
        if (canGoDown)
            possibleDirections.push(this.goDown);
        if (canGoRight)
            possibleDirections.push(this.goForward);
    }
    else if (this.direction == 'up' && ((new Date() - this.lastTurn) > turnThrottle)) {
        if (canGoLeft)
            possibleDirections.push(this.goBackward);
        if (canGoRight)
            possibleDirections.push(this.goForward);
        if (!canGoUp && canGoDown)
            possibleDirections.push(this.goDown);
        if (canGoUp)
            possibleDirections.push(this.goUp);
    }
    else if (this.direction == 'down' && ((new Date() - this.lastTurn) > turnThrottle)) {
        if (canGoLeft)
            possibleDirections.push(this.goBackward);
        if (canGoRight)
            possibleDirections.push(this.goForward);
        if (!canGoDown && canGoUp)
            possibleDirections.push(this.goUp);
        if (canGoDown)
            possibleDirections.push(this.goDown);
    }
    else if (this.direction == 'left' && ((new Date() - this.lastTurn) > turnThrottle)) {
        if (!canGoLeft && canGoRight)
            possibleDirections.push(this.goForward);
        if (canGoUp)
            possibleDirections.push(this.goUp);
        if (canGoDown)
            possibleDirections.push(this.goDown);
        if (canGoLeft)
            possibleDirections.push(this.goBackward);
    }

    var directionNumberToGo = Math.floor(Math.random() * possibleDirections.length);
    if (possibleDirections[directionNumberToGo]) {
        possibleDirections[directionNumberToGo].call(this);
        this.lastTurn = new Date();
    }


    moveablePlayer.prototype.advance.call(this);
}

ghost.prototype.resetting = false;
ghost.prototype.startReset = function () {
    this.resetting = true;
    this.eatable = false;
}


ghost.prototype.throbCount = 0;
ghost.prototype.draw = function () {


    var ctx = gameArgs.getContext();

    ctx.fillStyle = this.eatable ? ( this.eatableWaning && this.throbCount == 4 ? 'white' : '#a1deea'):  this.color;
    ctx.beginPath();

    var x = this.point.x;
    var y = this.point.y;

    if (!this.resetting && this.eatable && this.eatableWaning) {
        if (this.throbCount == 4) {
            this.throbCount = 0;
            //return;
        }
        else {
            this.throbCount++;
        }
    }

    if (!this.resetting) {
        ctx.arc(x, -4.5 + y, 18, Math.PI, 0);


        ctx.lineTo(18 + x, 22.5 + y);
        ctx.lineTo(14.4 + x, 17.5 + y);
        ctx.lineTo(10.8 + x, 22.5 + y);
        ctx.lineTo(7.2 + x, 17.5 + y);
        ctx.lineTo(3.6 + x, 22.5 + y);
        ctx.lineTo(0 + x, 17.5 + y);
        ctx.lineTo(-3.6 + x, 22.5 + y);
        ctx.lineTo(-7.2 + x, 17.5 + y);
        ctx.lineTo(-10.8 + x, 22.5 + y);
        ctx.lineTo(-14.4 + x, 17.5 + y);
        ctx.lineTo(-18 + x, 22.5 + y);

        ctx.lineTo(-18 + x, -4.5 + y);
        ctx.closePath();
        ctx.fill();
    }

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - 7, y - 10, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 7, y - 9.5, 1.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x + 7, y - 10, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + 7, y - 9.5, 1.5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();


    //ctx.fillStyle = 'red';
    //ctx.beginPath();
    //ctx.arc(this.point.x + this.pointCenterOffsetX, this.point.y + this.pointCenterOffsetY, 3, 0, Math.PI * 2);
    //ctx.closePath();
    //ctx.fill();
}