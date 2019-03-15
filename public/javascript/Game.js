var game = function () {
    var playingGame = false;

    var ctx = gameArgs.getContext();
    ctx.strokeStyle = "#ffffff";
    var p = new pacMan(ctx);
    var numberOfLives = 3;
    var ghostSpeed = 2;
    var imgBackground = new Image();
    var backgroundLoaded = false;
    imgBackground.onload = function () {
        backgroundLoaded = true;
    };
    imgBackground.src = '/images/pac-man-game-board.png';


    var gameGrids = [
              //0                                           1                                           2                                           3                                             4                                           5                                           6                                            7                                           8                                          9                                           10                                          11                                          12                                          13                                          14                                          15                                 
 /*00*/[new gameGrid(true, false, false, true), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, false, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, true, false, false), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, false, false, true), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, false, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, true, false, false)],
 /*01*/[new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true)],
 /*02*/[new gameGrid(false, false, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true)],
 /*03*/[new gameGrid(false, false, false, true), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, false, false, false), new gameGrid(true, false, true, false), new gameGrid(true, false, false, false), new gameGrid(false, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, false, true, false), new gameGrid(true, false, false, false), new gameGrid(true, false, true, false), new gameGrid(false, false, false, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, true, false, false)],
 /*04*/[new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true)],
 /*05*/[new gameGrid(false, false, true, true), new gameGrid(true, false, false, false), new gameGrid(true, false, true, false), new gameGrid(false, true, false, false), new gameGrid(true, true, true, true), new gameGrid(false, false, true, false), new gameGrid(true, true, false, false), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, false, false, true), new gameGrid(false, true, true, false), new gameGrid(true, true, true, true), new gameGrid(false, false, false, true), new gameGrid(true, false, true, false), new gameGrid(true, false, false, false), new gameGrid(false, true, true, false)],
 /*06*/[new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, false), new gameGrid(true, true, true, true)],
 /*07*/[new gameGrid(true, true, true, true), new gameGrid(false, false, true, true), new gameGrid(true, false, true, false), new gameGrid(false, true, false, false), new gameGrid(true, true, true, true), new gameGrid(true, false, false, true), new gameGrid(false, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, false, true, false), new gameGrid(true, true, false, false), new gameGrid(true, true, true, true), new gameGrid(false, false, false, true), new gameGrid(true, false, true, false), new gameGrid(false, true, true, false), new gameGrid(true, true, true, true)],
 /*08*/[new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true)],
 /*09*/[new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, false, false, false), new gameGrid(true, false, true, false), new gameGrid(false, true, false, false), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, false, false, true), new gameGrid(true, false, true, false), new gameGrid(false, false, false, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false)],
 /*10*/[new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, false, true, true), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, true, true, false), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true)],
 /*11*/[new gameGrid(true, true, true, true), new gameGrid(true, false, false, true), new gameGrid(true, false, true, false), new gameGrid(false, true, false, false), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, false, false, true), new gameGrid(true, false, true, false), new gameGrid(true, true, false, false), new gameGrid(true, true, true, true)],
 /*12*/[new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, false, false, true), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, true, false, false), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true)],
 /*13*/[new gameGrid(true, false, false, true), new gameGrid(false, true, true, false), new gameGrid(true, true, true, true), new gameGrid(false, false, true, true), new gameGrid(true, false, false, false), new gameGrid(false, true, true, false), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, false, true, true), new gameGrid(true, false, false, false), new gameGrid(false, true, true, false), new gameGrid(true, true, true, true), new gameGrid(false, false, true, true), new gameGrid(true, true, false, false)],
 /*14*/[new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(true, true, true, true), new gameGrid(false, true, false, true)],
 /*15*/[new gameGrid(false, false, true, true), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(true, false, true, false), new gameGrid(false, true, true, false)],
    ];

    var pills = [
        //new pill(ctx, { x: 20, y: 25 }),
        new pill(ctx, { x: 50, y: 25 }),
        new pill(ctx, { x: 75, y: 25 }),
        new pill(ctx, { x: 100, y: 25 }),
        new pill(ctx, { x: 125, y: 25 }),
        new pill(ctx, { x: 150, y: 25 }),
        new pill(ctx, { x: 175, y: 25 }),
        new pill(ctx, { x: 175, y: 50 }),
        new pill(ctx, { x: 175, y: 75 }),
        new pill(ctx, { x: 175, y: 100 }),
        new pill(ctx, { x: 175, y: 125 }),
        new pill(ctx, { x: 175, y: 150 }),
        new pill(ctx, { x: 175, y: 175 }),
        new pill(ctx, { x: 175, y: 200 }),
        new pill(ctx, { x: 175, y: 225 }),
        new pill(ctx, { x: 175, y: 250 }),
        new pill(ctx, { x: 175, y: 275 }),
        new pill(ctx, { x: 175, y: 300 }),
        new pill(ctx, { x: 175, y: 325 }),
        new pill(ctx, { x: 175, y: 350 }),
        new pill(ctx, { x: 175, y: 375 }),
        new pill(ctx, { x: 175, y: 400 }),
        new pill(ctx, { x: 175, y: 425 }),
        new pill(ctx, { x: 175, y: 450 }),
        new pill(ctx, { x: 175, y: 475 }),
        new pill(ctx, { x: 175, y: 500 }),
        new pill(ctx, { x: 175, y: 525 }),
        new pill(ctx, { x: 175, y: 550 }),
        new pill(ctx, { x: 175, y: 575 }),
        new pill(ctx, { x: 175, y: 600 }),
        new pill(ctx, { x: 175, y: 625 }),
        new pill(ctx, { x: 175, y: 650 }),
        new pill(ctx, { x: 175, y: 675 }),
        new pill(ctx, { x: 200, y: 25 }),
        new pill(ctx, { x: 225, y: 25 }),
        new pill(ctx, { x: 250, y: 25 }),
        new pill(ctx, { x: 275, y: 25 }),
        new pill(ctx, { x: 300, y: 25 }),
        new pill(ctx, { x: 325, y: 25 }),  //End top row segment 1
        new pill(ctx, { x: 25, y: 50 }),   //Seg begin
        new pill(ctx, { x: 25, y: 75 }),
        new pill(ctx, { x: 25, y: 100 }),
        new pill(ctx, { x: 25, y: 125 }),
        new pill(ctx, { x: 25, y: 150 }),
        new pill(ctx, { x: 25, y: 175 }),
        new pill(ctx, { x: 50, y: 175 }),
        new pill(ctx, { x: 75, y: 175 }),
        new pill(ctx, { x: 100, y: 175 }),
        new pill(ctx, { x: 125, y: 175 }),
        new pill(ctx, { x: 150, y: 175 }),

        new pill(ctx, { x: 25, y: 200 }),
        new pill(ctx, { x: 25, y: 225 }),
        new pill(ctx, { x: 25, y: 250 }),
        new pill(ctx, { x: 50, y: 275 }), //end seg
        new pill(ctx, { x: 75, y: 275 }),
        new pill(ctx, { x: 100, y: 275 }),
        new pill(ctx, { x: 125, y: 275 }),
        new pill(ctx, { x: 150, y: 275 }),

        new pill(ctx, { x: 25, y: 275 }),
        new pill(ctx, { x: 475, y: 25 }),
        new pill(ctx, { x: 500, y: 25 }),
        new pill(ctx, { x: 525, y: 25 }),
        new pill(ctx, { x: 550, y: 25 }),
        new pill(ctx, { x: 575, y: 25 }),
        new pill(ctx, { x: 600, y: 25 }),
        new pill(ctx, { x: 625, y: 25 }),
        new pill(ctx, { x: 650, y: 25 }),
        new pill(ctx, { x: 675, y: 25 }),
        new pill(ctx, { x: 700, y: 25 }),
        new pill(ctx, { x: 725, y: 25 }),
        new pill(ctx, { x: 750, y: 25 }),  //End top row segment 2

        new pill(ctx, { x: 475, y: 50 }),
        new pill(ctx, { x: 475, y: 75 }),
        new pill(ctx, { x: 475, y: 100 }),
        new pill(ctx, { x: 475, y: 125 }),
        new pill(ctx, { x: 475, y: 150 }),

        new pill(ctx, { x: 625, y: 50 }),
        new pill(ctx, { x: 625, y: 75 }),
        new pill(ctx, { x: 625, y: 100 }),
        new pill(ctx, { x: 625, y: 125 }),
        new pill(ctx, { x: 625, y: 150 }),
        new pill(ctx, { x: 625, y: 200 }),
        new pill(ctx, { x: 625, y: 225 }),
        new pill(ctx, { x: 625, y: 250 }),
        new pill(ctx, { x: 625, y: 275 }),
        new pill(ctx, { x: 625, y: 300 }),
        new pill(ctx, { x: 625, y: 325 }),
        new pill(ctx, { x: 625, y: 350 }),
        new pill(ctx, { x: 625, y: 375 }),
        new pill(ctx, { x: 625, y: 400 }),
        new pill(ctx, { x: 625, y: 425 }),
        new pill(ctx, { x: 625, y: 450 }),
        new pill(ctx, { x: 625, y: 475 }),
        new pill(ctx, { x: 625, y: 500 }),
        new pill(ctx, { x: 625, y: 525 }),
        new pill(ctx, { x: 625, y: 550 }),
        new pill(ctx, { x: 625, y: 575 }),
        new pill(ctx, { x: 625, y: 600 }),
        new pill(ctx, { x: 625, y: 625 }),
        new pill(ctx, { x: 625, y: 650 }),
        new pill(ctx, { x: 625, y: 675 }),

        new pill(ctx, { x: 775, y: 200 }),
        new pill(ctx, { x: 775, y: 225 }),
        new pill(ctx, { x: 775, y: 250 }),
        new pill(ctx, { x: 775, y: 275 }),

        new pill(ctx, { x: 750, y: 275 }),
        new pill(ctx, { x: 725, y: 275 }),
        new pill(ctx, { x: 700, y: 275 }),
        new pill(ctx, { x: 675, y: 275 }),
        new pill(ctx, { x: 650, y: 275 }),

        new pill(ctx, { x: 725, y: 300 }),
        new pill(ctx, { x: 725, y: 325 }),
        new pill(ctx, { x: 725, y: 350 }),
        new pill(ctx, { x: 725, y: 375 }),

        new pill(ctx, { x: 700, y: 375 }),
        new pill(ctx, { x: 675, y: 375 }),
        new pill(ctx, { x: 650, y: 375 }),

        new pill(ctx, { x: 325, y: 50 }),
        new pill(ctx, { x: 325, y: 75 }),
        new pill(ctx, { x: 325, y: 100 }),
        new pill(ctx, { x: 325, y: 125 }),
        new pill(ctx, { x: 325, y: 150 }),


        new pill(ctx, { x: 275, y: 200 }),
        new pill(ctx, { x: 275, y: 225 }),
        new pill(ctx, { x: 275, y: 250 }),
        new pill(ctx, { x: 275, y: 275 }),

        new pill(ctx, { x: 300, y: 275 }),
        new pill(ctx, { x: 325, y: 275 }),


        new pill(ctx, { x: 325, y: 300 }),
        new pill(ctx, { x: 325, y: 325 }),
        new pill(ctx, { x: 325, y: 350 }),

        new pill(ctx, { x: 275, y: 375 }),
        new pill(ctx, { x: 300, y: 375 }),
        new pill(ctx, { x: 325, y: 375 }),
        new pill(ctx, { x: 350, y: 375 }),
        new pill(ctx, { x: 375, y: 375 }),
        new pill(ctx, { x: 400, y: 375 }),
        new pill(ctx, { x: 425, y: 375 }),
        new pill(ctx, { x: 450, y: 375 }),
        new pill(ctx, { x: 475, y: 375 }),
        new pill(ctx, { x: 500, y: 375 }),
        new pill(ctx, { x: 525, y: 375 }),


        new pill(ctx, { x: 500, y: 275 }),
        new pill(ctx, { x: 525, y: 275 }),
        new pill(ctx, { x: 525, y: 250 }),
        new pill(ctx, { x: 525, y: 225 }),
        new pill(ctx, { x: 525, y: 200 }),

        new pill(ctx, { x: 475, y: 275 }),
        new pill(ctx, { x: 475, y: 300 }),
        new pill(ctx, { x: 475, y: 325 }),
        new pill(ctx, { x: 475, y: 350 }),


        new pill(ctx, { x: 775, y: 50 }),
        new pill(ctx, { x: 775, y: 75 }),
        new pill(ctx, { x: 775, y: 100 }),
        new pill(ctx, { x: 775, y: 125 }),
        new pill(ctx, { x: 775, y: 150 }),

        new pill(ctx, { x: 75, y: 300 }),
        new pill(ctx, { x: 75, y: 325 }),
        new pill(ctx, { x: 75, y: 350 }),
        new pill(ctx, { x: 75, y: 375 }),
        new pill(ctx, { x: 100, y: 375 }),
        new pill(ctx, { x: 125, y: 375 }),
        new pill(ctx, { x: 150, y: 375 }),

        new pill(ctx, { x: 200, y: 175 }),
        new pill(ctx, { x: 225, y: 175 }),
        new pill(ctx, { x: 250, y: 175 }),
        new pill(ctx, { x: 275, y: 175 }),
        new pill(ctx, { x: 300, y: 175 }),
        new pill(ctx, { x: 325, y: 175 }),
        new pill(ctx, { x: 350, y: 175 }),
        new pill(ctx, { x: 375, y: 175 }),
        new pill(ctx, { x: 400, y: 175 }),
        new pill(ctx, { x: 425, y: 175 }),
        new pill(ctx, { x: 450, y: 175 }),
        new pill(ctx, { x: 475, y: 175 }),
        new pill(ctx, { x: 500, y: 175 }),
        new pill(ctx, { x: 525, y: 175 }),
        new pill(ctx, { x: 550, y: 175 }),
        new pill(ctx, { x: 575, y: 175 }),
        new pill(ctx, { x: 600, y: 175 }),
        new pill(ctx, { x: 625, y: 175 }),
        new pill(ctx, { x: 650, y: 175 }),
        new pill(ctx, { x: 675, y: 175 }),
        new pill(ctx, { x: 700, y: 175 }),
        new pill(ctx, { x: 725, y: 175 }),
        new pill(ctx, { x: 750, y: 175 }),
        new pill(ctx, { x: 775, y: 175 }),

        new pill(ctx, { x: 275, y: 400 }),
        new pill(ctx, { x: 275, y: 425 }),
        new pill(ctx, { x: 275, y: 450 }),
        new pill(ctx, { x: 275, y: 475 }),
        new pill(ctx, { x: 275, y: 500 }),
        new pill(ctx, { x: 275, y: 525 }),

        new pill(ctx, { x: 300, y: 525 }),
        new pill(ctx, { x: 325, y: 525 }),
        new pill(ctx, { x: 350, y: 525 }),
        new pill(ctx, { x: 375, y: 525 }),
        new pill(ctx, { x: 400, y: 525 }),
        new pill(ctx, { x: 425, y: 525 }),
        new pill(ctx, { x: 450, y: 525 }),
        new pill(ctx, { x: 475, y: 525 }),
        new pill(ctx, { x: 500, y: 525 }),
        new pill(ctx, { x: 525, y: 525 }),

        new pill(ctx, { x: 525, y: 500 }),
        new pill(ctx, { x: 525, y: 475 }),
        new pill(ctx, { x: 525, y: 450 }),
        new pill(ctx, { x: 525, y: 425 }),
        new pill(ctx, { x: 525, y: 400 }),

        new pill(ctx, { x: 550, y: 475 }),
        new pill(ctx, { x: 575, y: 475 }),
        new pill(ctx, { x: 600, y: 475 }),
        new pill(ctx, { x: 650, y: 475 }),
        new pill(ctx, { x: 675, y: 475 }),
        new pill(ctx, { x: 700, y: 475 }),
        new pill(ctx, { x: 725, y: 475 }),
        new pill(ctx, { x: 750, y: 475 }),
        new pill(ctx, { x: 775, y: 475 }),

        new pill(ctx, { x: 25, y: 475 }),
        new pill(ctx, { x: 50, y: 475 }),
        new pill(ctx, { x: 75, y: 475 }),
        new pill(ctx, { x: 100, y: 475 }),
        new pill(ctx, { x: 125, y: 475 }),
        new pill(ctx, { x: 150, y: 475 }),

        new pill(ctx, { x: 200, y: 475 }),
        new pill(ctx, { x: 225, y: 475 }),
        new pill(ctx, { x: 250, y: 475 }),

        new pill(ctx, { x: 150, y: 575 }),
        new pill(ctx, { x: 125, y: 575 }),
        new pill(ctx, { x: 100, y: 575 }),
        new pill(ctx, { x: 75, y: 575 }),
        new pill(ctx, { x: 75, y: 600 }),
        new pill(ctx, { x: 75, y: 625 }),
        new pill(ctx, { x: 75, y: 650 }),
        new pill(ctx, { x: 75, y: 675 }),


        new pill(ctx, { x: 50, y: 675 }),
        new pill(ctx, { x: 25, y: 675 }),


        new pill(ctx, { x: 25, y: 700 }),
        new pill(ctx, { x: 25, y: 725 }),
        new pill(ctx, { x: 25, y: 750 }),


        new pill(ctx, { x: 50, y: 775 }),
        new pill(ctx, { x: 75, y: 775 }),
        new pill(ctx, { x: 100, y: 775 }),
        new pill(ctx, { x: 125, y: 775 }),
        new pill(ctx, { x: 150, y: 775 }),
        new pill(ctx, { x: 175, y: 775 }),
        new pill(ctx, { x: 200, y: 775 }),
        new pill(ctx, { x: 225, y: 775 }),
        new pill(ctx, { x: 250, y: 775 }),
        new pill(ctx, { x: 275, y: 775 }),
        new pill(ctx, { x: 300, y: 775 }),
        new pill(ctx, { x: 325, y: 775 }),
        new pill(ctx, { x: 350, y: 775 }),
        new pill(ctx, { x: 375, y: 775 }),
        new pill(ctx, { x: 400, y: 775 }),
        new pill(ctx, { x: 425, y: 775 }),
        new pill(ctx, { x: 450, y: 775 }),
        new pill(ctx, { x: 475, y: 775 }),
        new pill(ctx, { x: 500, y: 775 }),
        new pill(ctx, { x: 525, y: 775 }),
        new pill(ctx, { x: 550, y: 775 }),
        new pill(ctx, { x: 575, y: 775 }),
        new pill(ctx, { x: 600, y: 775 }),
        new pill(ctx, { x: 625, y: 775 }),
        new pill(ctx, { x: 650, y: 775 }),
        new pill(ctx, { x: 675, y: 775 }),
        new pill(ctx, { x: 700, y: 775 }),
        new pill(ctx, { x: 725, y: 775 }),
        new pill(ctx, { x: 750, y: 775 }),

        new pill(ctx, { x: 775, y: 750 }),
        new pill(ctx, { x: 775, y: 725 }),
        new pill(ctx, { x: 775, y: 700 }),
        new pill(ctx, { x: 775, y: 675 }),

        new pill(ctx, { x: 750, y: 675 }),
        new pill(ctx, { x: 725, y: 675 }),

        new pill(ctx, { x: 725, y: 650 }),
        new pill(ctx, { x: 725, y: 625 }),
        new pill(ctx, { x: 725, y: 600 }),
        new pill(ctx, { x: 725, y: 575 }),

        new pill(ctx, { x: 700, y: 575 }),
        new pill(ctx, { x: 675, y: 575 }),
        new pill(ctx, { x: 650, y: 575 }),


        new pill(ctx, { x: 200, y: 675 }),
        new pill(ctx, { x: 225, y: 675 }),
        new pill(ctx, { x: 250, y: 675 }),
        new pill(ctx, { x: 275, y: 675 }),
        new pill(ctx, { x: 275, y: 650 }),
        new pill(ctx, { x: 275, y: 625 }),

        new pill(ctx, { x: 300, y: 625 }),
        new pill(ctx, { x: 325, y: 625 }),
        new pill(ctx, { x: 350, y: 625 }),
        //new pill(ctx, { x: 375, y: 625 }),
        //new pill(ctx, { x: 400, y: 625 }),
        //new pill(ctx, { x: 425, y: 625 }),
        new pill(ctx, { x: 450, y: 625 }),
        new pill(ctx, { x: 475, y: 625 }),
        new pill(ctx, { x: 500, y: 625 }),
        new pill(ctx, { x: 525, y: 625 }),

        new pill(ctx, { x: 525, y: 650 }),
        new pill(ctx, { x: 525, y: 675 }),


        new pill(ctx, { x: 550, y: 675 }),
        new pill(ctx, { x: 575, y: 675 }),
        new pill(ctx, { x: 600, y: 675 }),


        new pill(ctx, { x: 575, y: 700 }),
        new pill(ctx, { x: 575, y: 725 }),
        new pill(ctx, { x: 575, y: 750 }),

        new pill(ctx, { x: 225, y: 700 }),
        new pill(ctx, { x: 225, y: 725 }),
        new pill(ctx, { x: 225, y: 750 }),

        new pill(ctx, { x: 25, y: 25 }, true),
        new pill(ctx, { x: 25, y: 775 }, true),
        new pill(ctx, { x: 775, y: 775 }, true),
        new pill(ctx, { x: 775, y: 25 }, true),
    ];

    var originalPills = JSON.parse(JSON.stringify(pills));

    var ghosts = [];

    var ghostInitializationCount = 0;
    function resetGhosts() {
        ghostInitializationCount = 0;
        ghosts = [
            new ghost(ctx, { x: 382, y: 430 }, 'orange', gameGrids, ghostSpeed),
            new ghost(ctx, { x: 382, y: 430 }, 'red', gameGrids, ghostSpeed),
            new ghost(ctx, { x: 382, y: 430 }, 'blue', gameGrids, ghostSpeed),
            new ghost(ctx, { x: 382, y: 430 }, 'green', gameGrids, ghostSpeed),
        ];
        sendGhostOut();
    }

    function sendGhostOut() {
        var ghost = ghosts[ghostInitializationCount];

        if (!ghost)
            return;

        ghost.sendOut();
        ghostInitializationCount++;
        setTimeout(sendGhostOut, 750);
    }

    resetGhosts();

    function resetBoard() {
        for (var i = 0; i < originalPills.length; i++) {
            pills.push(new pill(ctx, { x: originalPills[i].point.x, y: originalPills[i].point.y }, originalPills[i].powerUp));
        }
        p.reset();
        resetGhosts();
        backgroundLoaded = true;
    }

    p.board = gameGrids;

    //Frame-rate of about 40/FPS
    setInterval(function () {
        advance();
        draw();
    }, 1000 / 40);

    function resetGame() {
        playingGame = true;
        resetBoard();
        resetGhosts();
        numberOfLives = 3;
        ghostSpeed = 2;
        p.reset();
        backgroundLoaded = true;
    }

    $(document).keydown(function (event) {
        switch (event.which) {
            case 39:        //Right key
                p.goForward();
                break;
            case 37:        //Left Key
                p.goBackward();
                break;
            case 38:
                p.goUp();
                break;
            case 40:
                p.goDown();
                break;
            case 77:
                document.location.href = '/Games/GameMenu?timeout=' + getParameterByName('timeout');
                break;
            default:
                console.log(event.which);
        }
    });

    var hammertime = new Hammer(document.getElementById('body'));
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL  });
    hammertime.on('swipeleft', function (evt) {
        p.goBackward();
    });
    hammertime.on('swiperight', function (evt) {
        p.goForward();
    });
    hammertime.on('swipeup', function (evt) {

        p.goUp();
    });
    hammertime.on('swipedown', function (evt) {

        p.goDown();
    });

    hammertime.on('tap', function (evt) {
        if (!playingGame)
            resetGame();
    });


    $(document).keyup(function (event) {
        switch (event.which) {
            case 32:        //The space-bar
                if (!playingGame) {
                    resetGame();
                }
                break;
        }
    });

    var checkGP = window.setInterval(function () {
        if (navigator.getGamepads()[0]) {
            repGP = window.setInterval(reportOnGamepad, 100);
            window.clearInterval(checkGP);
        }
    }, 500);

    //Joystick controls
    var REPEAT_DELAY = 250;
    prevState = { leftPushed: false, rightPushed: false, upPushed: false, downPushed: false, leftPushedDate: null, rightPushedDate: null, downPushedDate: null, upPushedDate: null };
    function reportOnGamepad() {
        var gp = navigator.getGamepads()[0];

        if ((new Date() - prevState.leftPushedDate) < REPEAT_DELAY)
            return;

        if (gp.axes[0] == -1) {          //Left stick
            if (!prevState.leftPushed || (new Date() - prevState.leftPushedDate) > REPEAT_DELAY) {
                p.goBackward();
                if (!prevState.leftPushed)
                    prevState.leftPushedDate = new Date();
                prevState.leftPushed = true;
            }
            else
                prevState.leftPushed = false;
        }
        else
            prevState.leftPushed = false;

        if (gp.axes[0] == 1) {         //Right stick
            if (!prevState.rightPushed || (new Date() - prevState.rightPushedDate) > REPEAT_DELAY) {
                p.goForward();
                if (!prevState.rightPushed)
                    prevState.rightPushedDate = new Date();
                prevState.rightPushed = true;
            }
        }
        else
            prevState.rightPushed = false;

        if (gp.axes[1] == -1) {         //Down stick
            if (!prevState.downPushed || (new Date() - prevState.downPushedDate) > REPEAT_DELAY) {
                p.goUp();
                if (!prevState.downPushed)
                    prevState.downPushedDate = new Date();
                prevState.downPushed = true;
            }
        }
        else
            prevState.downPushed = false;

        if (gp.axes[1] == 1) {         //Up stick
            if (!prevState.upPushed || (new Date() - prevState.upPushedDate) > REPEAT_DELAY) {
                p.goDown();
                if (!prevState.upPushed)
                    prevState.upPushedDate = new Date();
                prevState.upPushed = true;
            }
        }
        else
            prevState.upPushed = false;

        if (gp.buttons[0] && gp.buttons[0].pressed) {
            if (!playingGame) {
                resetGame();
            }
        }

        if (gp.buttons[2] && gp.buttons[2].pressed) {
            document.location.href = '/Games/GameMenu?timeout=' + getParameterByName('timeout');
        }
    }

    var powerUpInterval = null;
    function advance() {
        rectanglesToClear.push({ x: p.point.x - 22, y: p.point.y - 22, width: 44, height: 44 });
        for (var i = 0; i < ghosts.length; i++) {
            var ghost = ghosts[i];

            rectanglesToClear.push({ x: ghost.point.x - 18, y: ghost.point.y - 23, width: 36, height: 46 });
        }
        if (!playingGame)
            return;

        p.advance();

        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].advance();
        }

        for (var i = 0; i < ghosts.length; i++) {
            var ghost = ghosts[i];
            var distance = gameArgs.checkForCollision(p, ghost);
            if (distance < 40) {
                if (ghost.eatable) {
                    this.score += 10000;
                    reportScore();
                    ghost.startReset();
                    parent.postMessage('/quick-green-flash', '*');
                    soundFx.playGhostDie();
                }
                else if (p.alive && !p.isDying && !p.invincible && !ghost.resetting) {
                    p.kill(numberOfLives > 0);
                    parent.postMessage('/quick-red-flash', '*');
                    numberOfLives--;
                    if (numberOfLives < 0) {
                        setTimeout(function () {
                            parent.postMessage('/cycle-wave', '*');
                            document.location.href = '/Games/HighScore?game=PacMan&score=' + score;
                        }, 3000);
                        playingGame = false;
                    }

                    soundFx.playDie();
                }
            }
        }

        for (var i = 0; i < pills.length; i++) {
            var distance = gameArgs.checkForCollision(p, pills[i]);
            if (distance < 10) {
                if (pills[i].powerUp) {
                    for (var j = 0; j < ghosts.length; j++) {
                        ghosts[j].eatable = true;
                        ghosts[j].eatableWaning = false;
                    }

                    clearTimeout(powerUpInterval);
                    soundFx.pauseBgMusic();
                    soundFx.playInvicibleMusic();
                    soundFx.playPowerUp();
                    powerUpInterval = setTimeout(function () {

                        for (var j = 0; j < ghosts.length; j++) {
                            ghosts[j].eatable = false;
                            ghosts[j].eatableWaning = true;
                        }
                        soundFx.pauseInvicibleMusic();
                        soundFx.playBgMusic();
                    }, 10000);

                    setTimeout(function () {
                        for (var j = 0; j < ghosts.length; j++)
                            ghosts[j].eatableWaning = true;
                    }, 7000);
                }

                pills.splice(pills.indexOf(pills[i]), 1);
                soundFx.playCoin();
                score += 100;
                reportScore();
            }
            else if (distance < 40)
                pills[i].pillDrawn = false;

            for (var j = 0; j < ghosts.length; j++) {
                var distance = gameArgs.checkForCollision(ghosts[j], pills[i]);
                if (distance < 35)
                    pills[i].pillDrawn = false;
            }
        }

        if (pills.length == 0) {
            //Level cleared
            resetBoard();
            ghostSpeed += 1;
            parent.postMessage('/cycle-wave', '*');
        }
    }

    var score = 0;

    function reportScore() {
        document.getElementById('score').innerHTML = score;
    }

    var rectanglesToClear = [];

    function draw() {
        for (var i = 0; i < rectanglesToClear.length; i++) {
            var rect = rectanglesToClear[i];
            if (rect.x < 0)
                rect.x = 0;
            if (rect.y < 0)
                rect.y = 0;
            if (rect.x + rect.width > 800)
                rect.x = 800 - rect.width;

            ctx.drawImage(imgBackground, rect.x, rect.y, rect.width, rect.height, rect.x, rect.y, rect.width, rect.height);
        }
        if (backgroundLoaded) {
            ctx.drawImage(imgBackground, 0, 0);
            backgroundLoaded = false;
        }

        p.draw();

        for (var i = 0; i < pills.length; i++) {
            if (!pills[i].pillDrawn) {
                pills[i].draw();
                pills[i].pillDrawn = true;
            }
        }

        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].draw();
        }

        var livesCanvas = document.getElementById("livesCanvas");
        livesCanvas.width = 250;
        livesCanvas.height = 100;

        var livesCtx = livesCanvas.getContext("2d");
        for (var i = 0; i < numberOfLives; i++) {
            var livePac = new pacMan(livesCtx);
            livePac.point = { x: i * 60 + 25, y: 25 };

            livePac.draw();
        }

        rectanglesToClear = [];
    }


    soundFx.playBgMusic();
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
var startGameDate = new Date();
if (getParameterByName('timeout')) {
    setTimeout(function () {
        document.location.href = '/Games/GameMenu?timeout=' + getParameterByName('timeout')

    }, getParameterByName('timeout'));
    setInterval(function () {
        var elapsedMiliseconds = new Date() - startGameDate;

        var timeLeft = getParameterByName('timeout') - elapsedMiliseconds;

        var minutes = parseInt(timeLeft / 60000);
        if (minutes > 0)
            timeLeft = timeLeft - (minutes * 60000);
        var seconds = parseInt((timeLeft / 1000));

        if (seconds < 0)
            seconds = 0;

        var secondsString = seconds.toString();
        if (secondsString.length == 1)
            secondsString = '0' + secondsString;

        if (document.getElementById('time-counter')) {
            document.getElementById('time-counter').innerHTML = minutes + ':' + secondsString;
        }
    }, 200);

}