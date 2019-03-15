var moveablePlayer = function (ctx) {
    flyingObject.call(this, ctx);

}

moveablePlayer.prototype = Object.create(flyingObject.prototype);

moveablePlayer.constructor = moveablePlayer;
moveablePlayer.prototype.advanceThroughPortal = function () {

}

moveablePlayer.prototype.advance = function () {
    if (!this.alive)
        return;
    if (this.point.x < 0) {
        this.point.x = gameArgs.A_SCREEN_WIDTH;
        this.advanceThroughPortal();
    }
    if (this.point.x > gameArgs.A_SCREEN_WIDTH) {
        this.point.x = 0;
        this.advanceThroughPortal();
    }

    if (this.direction == 'right' && !this.canGoRight())
        this.velocity.dx = 0;

    if (this.direction == 'down' && !this.canGoDown())
        this.velocity.dy = 0;

    if (this.direction == 'left' && !this.canGoLeft())
        this.velocity.dx = 0;

    if (this.direction == 'up' && !this.canGoUp())
        this.velocity.dy = 0;

    if (this.yAdjustment != 0) {
        this.point.y = this.yAdjustment;
        this.yAdjustment = 0;
    }

    if (this.xAdjustment != 0) {
        this.point.x = this.xAdjustment;
        this.xAdjustment = 0;
    }

    flyingObject.prototype.advance.call(this);
};


moveablePlayer.prototype.leftCheckPadding = 28;
moveablePlayer.prototype.canGoLeft = function () {
    var cellWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var cellHeight = gameArgs.A_SCREEN_HEIGHT / 16;
    var cellX = Math.round((this.point.x - 25) / cellWidth);
    var cellY = Math.round((this.point.y - 25) / cellHeight);
    var thisCell = this.board[cellY][cellX];

    if (thisCell) {
        if (this.point.x < cellX * cellWidth + this.leftCheckPadding) {
            var nextCell = this.board[cellY] ? this.board[cellY][cellX - 1] : null;
            if (thisCell.boundLeft || (nextCell && nextCell.boundRight)) {
                return false;
            }
        }
    }
    return true;
}

moveablePlayer.prototype.rightCheckPadding = 24;
moveablePlayer.prototype.canGoRight = function () {
    var cellWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var cellHeight = gameArgs.A_SCREEN_HEIGHT / 16;
    var cellX = Math.round((this.point.x - 25) / cellWidth);
    var cellY = Math.round((this.point.y - 25) / cellHeight);
    var thisCell = this.board[cellY][cellX];


    if (thisCell && this.point.x > cellX * cellWidth + this.rightCheckPadding) {
        var nextCell = this.board[cellY] ? this.board[cellY][cellX + 1] : null;
        if (thisCell.boundRight || (nextCell && nextCell.boundLeft)) {
            return false;
        }
    }

    return true;
}

moveablePlayer.prototype.bottomCheckPadding = 24;
moveablePlayer.prototype.canGoDown = function () {
    var cellWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var cellHeight = gameArgs.A_SCREEN_HEIGHT / 16;
    var cellX = Math.round((this.point.x - 25) / cellWidth);
    var cellY = Math.round((this.point.y - 25) / cellHeight);
    var thisCell = this.board[cellY][cellX];

    if (thisCell && this.point.y > cellY * cellHeight + this.bottomCheckPadding) {
        var nextCell = this.board[cellY + 1] ? this.board[cellY + 1][cellX] : null;
        if (thisCell.boundBottom || (nextCell && nextCell.boundTop)) {
            return false;
        }
    }

    return true;
}

moveablePlayer.prototype.topCheckPadding = 28;
moveablePlayer.prototype.canGoUp = function () {
    var cellWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var cellHeight = gameArgs.A_SCREEN_HEIGHT / 16;
    var cellX = Math.round((this.point.x - 25) / cellWidth);
    var cellY = Math.round((this.point.y - 25) / cellHeight);
    var thisCell = this.board[cellY][cellX];

    if (thisCell && this.point.y < cellY * cellHeight + this.topCheckPadding) {
        var nextCell = this.board[cellY - 1] ? this.board[cellY - 1][cellX] : null;
        if (thisCell.boundTop || (nextCell && nextCell.boundBottom)) {
            return false;
        }
    }

    return true;
}


moveablePlayer.prototype.yAdjustment = 0;
moveablePlayer.prototype.xAdjustment = 0;

moveablePlayer.prototype.bottomPadding = 25;
moveablePlayer.prototype.goForward = function () {
    if (!this.alive)
        return;
    if (!this.canGoRight())
        return;

    var cellHeight = gameArgs.A_SCREEN_HEIGHT / 16;
    var cellY = Math.round((this.point.y - 25) / cellHeight);

    this.yAdjustment = cellY * gameArgs.A_SCREEN_WIDTH / 16 + this.verticalAdjustPadding;

    this.direction = 'right';
    this.velocity.dy = 0;
    this.velocity.dx = this.speed;
}

moveablePlayer.prototype.horizontalAdjustPadding = 25;
moveablePlayer.prototype.goBackward = function () {
    if (!this.alive)
        return;
    if (!this.canGoLeft())
        return;

    var cellHeight = gameArgs.A_SCREEN_HEIGHT / 16;
    var cellY = Math.round((this.point.y - 25) / cellHeight);

    this.yAdjustment = cellY * gameArgs.A_SCREEN_HEIGHT / 16 + this.verticalAdjustPadding;

    this.direction = 'left';
    this.velocity.dy = 0;
    this.velocity.dx = -this.speed;
}

moveablePlayer.prototype.goUp = function () {
    if (!this.alive)
        return;
    if (!this.canGoUp())
        return;

    var cellWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var cellX = Math.round((this.point.x - 25) / cellWidth);
    this.xAdjustment = cellX * gameArgs.A_SCREEN_WIDTH / 16 + this.horizontalAdjustPadding;

    this.direction = 'up';
    this.velocity.dy = -this.speed;
    this.velocity.dx = 0;
}

moveablePlayer.prototype.verticalAdjustPadding = 25;
moveablePlayer.prototype.goDown = function () {
    if (!this.alive)
        return;
    if (!this.canGoDown()) {

        return;
    }

    var cellWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var cellX = Math.round((this.point.x - 25) / cellWidth);
    this.xAdjustment = cellX * gameArgs.A_SCREEN_WIDTH / 16 + this.horizontalAdjustPadding;

    this.direction = 'down';
    this.velocity.dy = this.speed;
    this.velocity.dx = 0;
}
