function soundFx() { }

soundFx.playCoin = function () {
    var v = document.getElementById("coinSound");
    v.currentTime = 0;
    v.play();
}

soundFx.playPortal = function () {
    var v = document.getElementById("portalSound");
    v.currentTime = 0;
    v.play();
}

soundFx.playDie = function () {
    var v = document.getElementById("dieSound");
    v.currentTime = 0;
    v.play();
}

soundFx.playGhostDie = function () {
    var v = document.getElementById("ghostDieSound");
    v.currentTime = 0;
    v.play();
}
soundFx.playPowerUp = function () {
    var v = document.getElementById("powerUpSound");
    v.currentTime = 0;
    v.play();
}

//

soundFx.playInvicibleMusic = function () {
    var v = document.getElementById("invincibleMusic");
    v.currentTime = 0;
    v.play();
}

soundFx.pauseInvicibleMusic = function () {
    var v = document.getElementById("invincibleMusic");
    v.pause();
}

soundFx.playBgMusic = function () {
    var v = document.getElementById("bgMusic");
    v.volume = .2;
    v.play();
}

soundFx.pauseBgMusic = function () {
    var v = document.getElementById("bgMusic");
    v.pause();
}




