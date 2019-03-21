var player = {
    id: uuidv4(),
    name: '',
};

if (localStorage.getItem('player-info')) {
    try {
        player = JSON.parse(localStorage.getItem('player-info'));
        document.getElementById('user-name').value = player.name;
    } catch (e) {}
}
document.getElementById('register-button').addEventListener('click', function () {

    document.getElementById('register-button').disabled = true;
    var api = apiService();
    var userName = document.getElementById('user-name').value;

    player.name = userName;


    api.post('/api/player', player, function (results) {
        window.match = results;
        window.player = player;

        console.log('registration Results:');
        console.log(results);

        document.getElementById('register-button').disabled = false;
        localStorage.setItem('player-info', JSON.stringify(player));

        webSocket.send(JSON.stringify({
            eventType: 'register',
            playerId: player.id,
            matchId: results.id,
        }));
        if (results.player_2 === player.id) {
            document.getElementById('registration').remove();
            //window.resetGame();
            // document.getElementById('splash-screen').remove();
            window.opponentName = results.opponent;
            countDown();
        } else {
            showWaitingForOpponent();
            window.isPlayer1 = true;
            console.log('im player 1')
        }
    });
});



function showWaitingForOpponent() {
    document.getElementById('registration-step').style.display = 'none';
    document.getElementById('waiting-step').style.display = 'block';
    window.isPlayer1 = true;
}

function sendGameEvent(description, score, meta) {
    webSocket.send(JSON.stringify({
        eventType: 'game-activity',
        matchId: window.match.id,
        playerId: window.player.id,
        description: description,
        score: score,
        meta: meta,
    }));
}


// setTimeout(function () {
//     soundFx.playPacManIntro();
// }, 1000);

setTimeout(function () {
    soundFx.playPacManIntro();
    document.getElementById('user-name').focus();
}, 500);
musicIntroInterval = setInterval(function () {
    soundFx.playPacManIntro();
}, 12000);

var webSocket = null;

function startWebSocket() {
    if (document.location.protocol === 'https:') {

        webSocket = new WebSocket("wss://" + document.location.host, "protocolOne");
    } else {
        webSocket = new WebSocket("ws://" + document.location.host, "protocolOne");
    }

    webSocket.onmessage = function (event) {

        try {
            var messageObj = JSON.parse(event.data);

            if (messageObj.eventType === 'opponent-found') {
                console.log('opponent found message:');
                console.log(messageObj);
                window.opponentName = messageObj.opponentName;
                document.getElementById('registration').remove();
                countDown();

            } else if (messageObj.eventType === 'game-activity') {
                if (messageObj.description === 'bomb-retrieved') {
                    console.log('received bomb');
                    window.opponentGotBomb();
                } else if (messageObj.description === 'bomb-created') {
                    var bomb = JSON.parse(messageObj.meta);
                    window.receiveBomb(bomb);
                } else if(messageObj.description === 'level-cleared'){
                    window.showGameMessage('Opponent Cleared a level');
                } else {
                    window.showOtherPlayerGameEvent(messageObj);
                }
            } else if (messageObj.eventType === 'play') {
                document.getElementById('registration').remove();
                window.resetGame();
            } else if (messageObj.eventType === 'countdown') {

            }
        } catch (e) {}
    }
    webSocket.onopen = function (event) {
        if (window.match && window.player) {
            webSocket.send(JSON.stringify({
                playerId: window.player.id,
                matchId: window.match.id,
                eventType: 'register'
            }));
        }
    };

    webSocket.onclose = function () {
        setTimeout(function () {
            startWebSocket();
        }, 5000);
    }
}

startWebSocket();

function countDown() {
    document.getElementById('v-v').innerHTML = window.player.name + ' vs. ' + window.opponentName;

    document.getElementById('count-3').style.display = 'inline';
    document.getElementById('count-3').classList.add('expand');
    setTimeout(function () {
        document.getElementById('count-3').style.display = 'none';
        document.getElementById('count-2').style.display = 'inline';
        document.getElementById('count-2').classList.add('expand');
    }, 1000);
    setTimeout(function () {
        document.getElementById('count-2').style.display = 'none';
        document.getElementById('count-1').style.display = 'inline';
        document.getElementById('count-1').classList.add('expand');
    }, 2000);
    setTimeout(function () {
        document.getElementById('count-1').style.display = 'none';
        document.getElementById('play').style.display = 'inline';
        document.getElementById('play').classList.add('expand');
        window.resetGame();
        clearInterval(musicIntroInterval);
        document.getElementById('scoreBox').style.display = 'block';
        document.getElementById('time-box').style.display = 'block';
    }, 3000);
    setTimeout(function () {
        document.getElementById('play').style.display = 'none';
    }, 4000);
}


function apiService() {

    function get(url, callback) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function (results) {

            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var responseText = oReq.responseText;
                if (!responseText) {
                    callback(null);
                } else {
                    callback(JSON.parse(responseText));
                }
            }
        });
        oReq.open("GET", url);
        oReq.setRequestHeader('Content-Type', 'application/json');
        oReq.send();
    }

    function post(url, data, callback) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function (results) {

            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var responseText = oReq.responseText;
                if (!responseText) {
                    callback(null);
                } else {
                    callback(JSON.parse(responseText));
                }
            }
        });
        oReq.open("POST", url);
        oReq.setRequestHeader('Content-Type', 'application/json');
        oReq.send(JSON.stringify(data));
    }

    return {
        get: get,
        post: post,
    };
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

window.showGameMessage = function (message) {
    console.log('fires');
    var messageDiv = document.getElementById('game-message');
    messageDiv.innerHTML = message;
    messageDiv.classList.remove('display');
    setTimeout(() => {
        messageDiv.classList.add('display');

        setTimeout(() => {
            messageDiv.classList.remove('display');
        }, 10000);
    });

}