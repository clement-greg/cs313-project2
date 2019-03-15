var gameGrid = function (boundTop, boundRight, boundBottom, boundLeft) {
    this.boundTop = boundTop;
    this.boundRight = boundRight;
    this.boundBottom = boundBottom;
    this.boundLeft = boundLeft;
};

gameGrid.prototype.draw = function(row, col)  {

    var gridSizeWidth = gameArgs.A_SCREEN_WIDTH / 16;
    var gridSizeHeight = gameArgs.A_SCREEN_HEIGHT / 16;

    var ctx = gameArgs.getContext();
    ctx.lineWidth = 3;

    if (this.boundTop && this.boundRight && this.boundLeft && this.boundBottom) {

        ctx.fillStyle = 'green';
        ctx.fillRect(col * gridSizeWidth, row * gridSizeHeight, gridSizeWidth, gridSizeHeight);
        return;
    }

    if (this.boundTop && row == 0) {
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(col * gridSizeWidth, row * gridSizeHeight);
        ctx.lineTo(col * gridSizeWidth + gridSizeWidth, row * gridSizeHeight);
        ctx.stroke();
    }

    if (this.boundRight && col == 15) {
        ctx.strokeStyle = 'green';
        ctx.beginPath();

        ctx.moveTo(col * gridSizeWidth + gridSizeWidth, row * gridSizeHeight);
        ctx.lineTo(col * gridSizeWidth + gridSizeWidth, row * gridSizeHeight + gridSizeHeight);
        ctx.stroke();
    }

    if (this.boundBottom && row == 15) {

        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(col * gridSizeWidth, row * gridSizeHeight + gridSizeHeight);
        ctx.lineTo(col * gridSizeWidth + gridSizeWidth, row * gridSizeHeight + gridSizeHeight);
        ctx.stroke();
    }

    if (this.boundLeft && col == 0) {
        ctx.strokeStyle = 'green';
        ctx.beginPath();

        ctx.moveTo(col * gridSizeWidth, row * gridSizeHeight);
        ctx.lineTo(col * gridSizeWidth, row * gridSizeHeight + gridSizeHeight);
        ctx.stroke();
    }
}