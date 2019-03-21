function demoLoop() {

    var ctx = null;
    var interval = null;

    var myPacMan = new pacMan(getDemoLoopContext());
    var myGhost = new ghost(getDemoLoopContext(), {
        x: 50,
        y: 50
    }, 'orange', null, 2.5);

    function getDemoLoopContext() {
        {
            if (!ctx) {
                var gameCanvas = document.getElementById("demo-loop-canvas");

                console.log(gameCanvas);
                gameCanvas.width = 800;

                gameCanvas.height = 800;
                ctx = gameCanvas.getContext("2d");
            }
        }
        return ctx;
    };

    function start() {
        // // pacMan.point = new point(100, 100);
        // myPacMan.point = {
        //     x: 150,
        //     y: 50
        // };

        
        // myPacMan.velocity = {dx: 2.5, dy: 0};
        // myGhost.velocity = {dx: 0, dy: 1};

        // interval = setInterval(function () {
        //     advance();
        //     draw();
        // }, 1000 / 40);
    }

    function stop() {
        clearInterval(interval);
    }

    function advance() {
        if(myPacMan.point.x > 750) {
            myPacMan.velocity = {dx: -2.5, dy: 0};
            myPacMan.direction = 'left';
        }
        if(myPacMan.point.x < 10) {
            myPacMan.velocity = {dx: 2.5, dy: 0};
            myPacMan.direction = 'right';
        }
        myPacMan.advance();
        myGhost.advance();
    }

    function draw() {
        ctx.clearRect(0, 0, 1000, 1000);
        myPacMan.draw();
        myGhost.draw();
    }

    return {
        stop: stop,
        start: start,
    };
}

demoLoop().start();