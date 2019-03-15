document.getElementById('register-button').addEventListener('click', function () {

    var api = apiService();
    var userName = document.getElementById('user-name').value;

    var player = {
        id: uuidv4(),
        name: userName,
    };

    api.post('/player', player, function () {
        document.getElementById('registration').remove();
        // console.log(game().reset());
        window.resetGame();
    });


});

console.log(document.location);
var exampleSocket = new WebSocket("ws://" + document.location.host , "protocolOne");
exampleSocket.onmessage = function (event) {
    console.log(event.data);
  }
exampleSocket.onopen = function (event) {
    exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
    console.log('on open');
  };

function apiService() {

    function get(url, callback) {

    }

    function post(url, data, callback) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                callback();
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