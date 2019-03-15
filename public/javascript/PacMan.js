var pacMan = function (ctx) {
    moveablePlayer.call(this, ctx);
    this.point = new point(400, 625);
    this.direction = 'right';
    this.velocity = new velocity(0, 0);
    this.board = [];
    this.speed = 6;
    this.ctx = ctx;

    this.outline = [
        { x: -22, y: -22 },
        { x: 22, y: -22 },
        { x: 22, y: 22 },
        { x: -22, y: 22 },
        { x: -22, y: -22 },
    ];
};

pacMan.prototype = Object.create(moveablePlayer.prototype);

pacMan.constructor = pacMan;

pacMan.prototype.reset = function () {
    this.point = new point(400, 625);
    this.velocity.dx = 0;
    this.velocity.dy = 0;
    this.direction = 'right';
    this.isDying = false;
    this.alive = true;
    this.invincible = true;
    var thisItem = this;
    setTimeout(function () {
        thisItem.invincible = false;
    }, 5000);
}

pacMan.prototype.isDying = false;
pacMan.dyingRadius = 0;
pacMan.invincible = false;

pacMan.prototype.powerMode = false;
pacMan.prototype.goIntoPowerMode = function () {
    this.powerMode = true;

    var thisItem = this;
    setTimeout(function () { thisItem.powerMode = false }, 7000);
}
pacMan.prototype.kill = function (respawn) {
    if (this.isDying || this.invincible)
        return;

    this.dyingRadius = 0;
    this.isDying = true;
    this.velocity.dx = 0;
    this.velocity.dy = 0;
    this.alive = false;
    var thisItem = this;

    setTimeout(function () {
        thisItem.yAdjustment = 625;
        thisItem.xAdjustment = 400;

        //thisItem.point = { x: 400, y: 625 };
        thisItem.velocity.dx = 0;
        thisItem.velocity.dy = 0;
        thisItem.direction = 'right';
        thisItem.isDying = false;
        thisItem.alive = true;
        thisItem.invincible = true;
        setTimeout(function () {
            thisItem.invincible = false;
        }, 5000);
    }, 2000);

}

pacMan.flashCount = 0;

pacMan.prototype.advanceThroughPortal = function () {
    soundFx.playPortal();
}

pacMan.prototype.draw = function () {

    if (this.invincible) {
        if (!this.flashCount)
            this.flashCount = 1;
            
        if (this.flashCount == 6) {
            this.flashCount = 0;
            return;
        }
        else
            this.flashCount += 1;
            
    }

    if (!this.lastMouthOffset)
        this.lastMouthOffset = Math.PI / 4;

    if (!this.ctx)
        this.ctx = gameArgs.getContext();

    ctx = this.ctx;

    if (this.waxing)
        this.lastMouthOffset += .05;
    else
        this.lastMouthOffset -= .05;
    if (this.lastMouthOffset < 0)
        this.waxing = true;
    else if (this.lastMouthOffset > Math.PI / 4) {
        this.waxing = false;
    }


    if (this.isDying)
        this.lastMouthOffset = .05;

    var mouthGap = Math.PI / 4 - this.lastMouthOffset;

    if (this.isDying) {
        mouthGap = Math.PI / 4 - this.dyingRadius;
        this.dyingRadius += .05;
    }

    ctx.fillStyle = this.powerMode ? 'red' : 'yellow';
    ctx.beginPath();
    ctx.moveTo(this.point.x, this.point.y);

    var turnAngle = .3;
    if (this.direction == 'left')
        turnAngle = 180;
    else if (this.direction == 'up')
        turnAngle = -1.2;
    else if (this.direction == 'down')
        turnAngle = 90;

    ctx.arc(this.point.x, this.point.y, 22, this.lastMouthOffset - mouthGap + turnAngle, Math.PI + Math.PI / 2 + mouthGap + this.lastMouthOffset + turnAngle);
    ctx.closePath();
    ctx.fill();

    if (!this.isDying) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        if (this.direction == 'down')
            ctx.arc(this.point.x + 10, this.point.y + 8, 5, 0, 2 * Math.PI);
        else if (this.direction == 'up')
            ctx.arc(this.point.x - 12, this.point.y - 10, 5, 0, 2 * Math.PI);
        else
            ctx.arc(this.point.x + 8, this.point.y - 13, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
};





