
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Array.prototype.removeItem = function (item) {
    this.splice(this.indexOf(item), 1);
};

var gameArgs = function () { };
gameArgs.A_SCREEN_WIDTH = 800;
gameArgs.A_SCREEN_HEIGHT = 800;
gameArgs.rotate = function (point, origin, rotation) {
    // because sine and cosine are expensive, we want to call them only once
    var cosA = Math.cos(Math.radians(rotation));
    var sinA = Math.sin(Math.radians(rotation));

    // remember our original point
    var tmp = { x: point.x - origin.x, y: point.y - origin.y };

    return { x: (tmp.x * cosA - tmp.y * sinA) + origin.x, y: (tmp.x * sinA + tmp.y * cosA) + origin.y };

    return point;
};

gameArgs.checkForCollision = function (obj1, obj2) {
    // find the maximum distance traveled
    var dMax = Math.max(Math.abs(obj1.velocity.dx), Math.abs(obj1.velocity.dy));
    dMax = Math.max(dMax, Math.abs(obj2.velocity.dx));
    dMax = Math.max(dMax, Math.abs(obj2.velocity.dy));
    dMax = Math.max(dMax, 0.1); // when dx and dy are 0.0. Go through the loop once.

    var distMin = 100000000;
    for (var i = 0.0; i <= dMax; i++) {
        var point1 = new point(obj1.point.x + obj1.pointCenterOffsetX + (obj1.velocity.dx * i / dMax), obj1.point.y + obj1.pointCenterOffsetY + (obj1.velocity.dy * i / dMax));
        var point2 = new point(obj2.point.x + obj2.pointCenterOffsetX + (obj2.velocity.dx * i / dMax), obj2.point.y + obj2.pointCenterOffsetY + (obj2.velocity.dy * i / dMax));


        var xDiff = point1.x - point2.x;
        var yDiff = point1.y - point2.y;

        var distSquared = (xDiff * xDiff) + (yDiff * yDiff);

        distMin = Math.min(distMin, distSquared);
    }

    return Math.sqrt(distMin);
};

gameArgs.areObjectsCollided = function (flyingObject1, flyingObject2) {
    var distance = gameArgs.checkForCollision(flyingObject1, flyingObject2);

    return distance < flyingObject1.collisionRadius + flyingObject2.collisionRadius;
};

gameArgs.random = function (min, max) {
    return Math.floor(Math.random() * max) + min;
};

gameArgs.randomFloat = function (min, max) {
    if (max < min) {
        var temp = min;
        min = max;
        max = temp;
    }
    return Math.random() * (max - min) + min;
};

gameArgs.drawPolygon = function drawPolygon(ctx, center, radius, points, rotation, color) {
    // begin drawing
    ctx.beginPath();
    if (!color)
        color = "#ffffff";

    ctx.strokeStyle = color;

    //loop around a circle the given number of times drawing a line from
    //one point to the next
    var firstPoint = null;
    for (var i = 0; i < 2 * Math.PI; i += (2 * Math.PI) / points) {
        var temp = new point(center.x + (radius * Math.cos(i)), center.y + (radius * Math.sin(i)));

        var rotatedPoint = gameArgs.rotate(temp, center, rotation);
        if (i == 0) {
            ctx.moveTo(rotatedPoint.x, rotatedPoint.y);
            firstPoint = rotatedPoint;
        }
        ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.stroke();
    ctx.strokeStyle = "#ffffff";
};

gameArgs.drawEllipse = function (ctx, center, radius, color) {
    gameArgs.drawPolygon(ctx, center, radius, 20, 0, color);
};

gameArgs.drawCrossCircle = function (ctx, center, radius) {
    gameArgs.drawEllipse(ctx, center, radius, "#ff0000");
    var temp = new point(center.x, center.y + radius);
    temp = gameArgs.rotate(temp, center, 45);

    var temp2 = new point(center.x, center.y - radius);
    temp2 = gameArgs.rotate(temp2, center, 45);

    ctx.beginPath();

    ctx.strokeStyle = "#ff0000";
    ctx.moveTo(temp.x, temp.y);

    ctx.lineTo(temp2.x, temp2.y);
    ctx.stroke();
    ctx.strokeStyle = "#ffffff";
};

gameArgs.drawPoints = function (points, center, rotation, color, ctx) {
    if (!ctx)
        ctx = this.getContext();
    if (!color)
        color = "#ffffff";

    ctx.strokeStyle = color;
    ctx.beginPath();

    var firstPoint = gameArgs.rotate({ x: center.x + points[0].x, y: center.y + points[0].y }, center, rotation);
    ctx.moveTo(firstPoint.x, firstPoint.y);

    for (var i = 1; i < points.length; i++) {
        var rotatedPoint = { x: points[i].x + center.x, y: points[i].y + center.y };
        rotatedPoint = gameArgs.rotate(rotatedPoint, center, rotation);
        ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
    }

    ctx.stroke();
};

gameArgs.drawLine = function (startPoint, endPoint, color, ctx) {
    if (!color)
        color = "#ffffff";
    if (!ctx)
        ctx = this.getContext();

    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
};

gameArgs.fillPath = function (points, color, ctx, fill) {
    if (!color)
        color = "#ffffff";

    if (!ctx)
        ctx = this.getContext();

    if (!fill)
        ctx.fillStyle = color;
    else
        ctx.fillStyle = fill;

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(0, this.A_SCREEN_HEIGHT);
    for (var i = 0; i < points.length; i++) {
        ctx.lineTo(i, points[i]);
    }
    ctx.lineTo(this.A_SCREEN_WIDTH, this.A_SCREEN_HEIGHT);
    ctx.lineTo(0, this.A_SCREEN_HEIGHT);
    ctx.fill();
    //ctx.stroke();
};

gameArgs.fillPoints = function (points, color, ctx) {
    if (!color)
        color = "#ffffff";
    if (!ctx)
        ctx = this.getContext();

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[0].x, points[0].y);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#ffffff";
};

gameArgs.getContext = function () {
    if (!gameArgs.context) {
        var gameCanvas = document.getElementById("gameCanvas");
        gameCanvas.width = this.A_SCREEN_WIDTH;
        gameCanvas.height = this.A_SCREEN_HEIGHT;

        var ctx = gameCanvas.getContext("2d");
        gameArgs.context = ctx;
    }

    return gameArgs.context;
};

gameArgs.drawLanderFlames = function (pt,
   bottom,
   left,
   right) {
    // simple point
    var PT = { x: 0, y: 0 };

    var iFlame = this.random(1, 3);  // so the flame flickers
    var flamePoints = [];
    if (bottom) {
        flamePoints = [
           new point(-5, -6), new point(0, -1), new point(3, -10),
           new point(-3, -6), new point(-1, -2), new point(0, -15),
           new point(2, -12), new point(1, 0), new point(6, -4)];

    }

    // right thrust
    if (right) {
        flamePoints = [
           new point(10, 14), new point(8, 12), new point(12, 12),
           new point(12, 10), new point(8, 10), new point(10, 8),
           new point(14, 11), new point(14, 11), new point(14, 11),
        ];

    }

    // left thrust
    if (left) {
        flamePoints = [
           new point(-10, 14), new point(-8, 12), new point(-12, 12),
           new point(-12, 10), new point(-8, 10), new point(-10, 8),
           new point(-14, 11), new point(-14, 11), new point(-14, 11),
        ];
    }

    for (var i = 0; i < flamePoints.length; i++) {
        flamePoints[i].y += iFlame + pt.y;
        flamePoints[i].x += pt.x;
        flamePoints[i] = gameArgs.rotate(flamePoints[i], pt, 180);

    }
    //For the life of me, I can't get the flames to render entirely in red
    this.fillPoints(flamePoints, "#ff0000");
}

$(function () {
    //Just create a new game object and let it do it's thing
    var myGame = new game();
});