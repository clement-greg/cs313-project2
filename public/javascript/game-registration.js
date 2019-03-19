var player = {
    id: uuidv4(),
    name: '',
};

if (localStorage.getItem('player-info')) {
    try {

        console.log('getting player info');
        player = JSON.parse(localStorage.getItem('player-info'));
        document.getElementById('user-name').value = player.name;
    } catch (e) {}
}
document.getElementById('register-button').addEventListener('click', function () {

    document.getElementById('register-button').disabled = true;
    var api = apiService();
    var userName = document.getElementById('user-name').value;

    player.name = userName;

    api.post('/player', player, function (results) {
        console.log('results:');
        console.log(results);
        window.match = results;
        window.player = player;

        document.getElementById('register-button').disabled = false;
        localStorage.setItem('player-info', JSON.stringify(player));

        console.log('sending');
        webSocket.send(JSON.stringify({
            eventType: 'register',
            playerId: player.id,
            matchId: results.id,
        }));
        if (results.player_2 === player.id) {
            document.getElementById('registration').remove();
            window.resetGame();
            // document.getElementById('splash-screen').remove();
        } else {
            showWaitingForOpponent();
        }
        console.log('sent');
    });
});



function showWaitingForOpponent() {
    console.log('waiting for opponent...');
    document.getElementById('registration-step').style.display = 'none';
    document.getElementById('waiting-step').style.display = 'block';
}

function sendGameEvent(description, score) {
    webSocket.send(JSON.stringify({
        eventType: 'game-activity',
        matchId: window.match.id,
        playerId: window.player.id,
        description: description,
        score: score,
    }));
}

var webSocket = new WebSocket("ws://" + document.location.host, "protocolOne");
webSocket.onmessage = function (event) {

    try {
        var messageObj = JSON.parse(event.data);
        if (messageObj.eventType === 'opponent-found') {
            document.getElementById('registration').remove();
            window.resetGame();
            // document.getElementById('splash-screen').remove();

        } else if (messageObj.eventType === 'game-activity') {
            window.showOtherPlayerGameEvent(messageObj);
        }
    } catch (e) {}
}
webSocket.onopen = function (event) {
    // exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
    // console.log('on open');
    console.log('opened');
};

function apiService() {

    function get(url, callback) {

    }

    function post(url, data, callback) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function (results) {

            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback(JSON.parse(oReq.responseText));
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