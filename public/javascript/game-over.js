var gameOverController = function () {
    //alert('game over');
    document.getElementById('main-game-board').style.display = 'none';
    document.body.style.overflow = 'auto';


    setTimeout(function () {
        soundFx.playPacManIntro();
        setInterval(function () {
            soundFx.playPacManIntro()
        }, 12000);
    }, 4000);

    document.getElementById('game-over-display').style.display = 'table';

    var opponentScore = parseInt(document.getElementById('other-score').innerText);
    var yourScore = parseInt(document.getElementById('score').innerText);

    if (yourScore > opponentScore) {
        document.getElementById('you-win-panel').style.display = 'block';
        soundFx.playWin();
    } else if (yourScore === opponentScore) {
        document.getElementById('you-tied-panel').style.display = 'block';
    } else {
        document.getElementById('you-lose-panel').style.display = 'block';
        soundFx.playSad();
    }

    document.getElementById('show-leader-board-button').addEventListener('click', function () {
        document.getElementById('my-matches-div').style.display = 'none';

        var div = document.getElementById('leader-board-div');
        div.style.display = 'block';
        div.classList.add('slide-in');
        setTimeout(function () {
            div.classList.remove('slide-in')
        }, 1000);
        document.getElementById('show-leader-board-button').classList.add('selected');
        document.getElementById('show-my-matches-button').classList.remove('selected');
    });

    document.getElementById('show-my-matches-button').addEventListener('click', function () {
        var div = document.getElementById('my-matches-div');
        div.style.display = 'block';
        div.classList.add('slide-in');
        setTimeout(function () {
            div.classList.remove('slide-in')
        }, 1000);
        document.getElementById('leader-board-div').style.display = 'none';
        document.getElementById('show-leader-board-button').classList.remove('selected');
        document.getElementById('show-my-matches-button').classList.add('selected');
    });

    // window.match = results;
    // window.player = player;
    var api = apiService();

    api.get('/api/leader-board', function (results) {

        console.log('leader-board:');
        console.log(results);

        results.forEach(function (item) {
            var template = document.getElementById('leader-board-item').innerHTML;
            template = template.replace('{{player_name}}', item.player_name);
            template = template.replace('{{score}}', item.score);
            var li = document.createElement('li');

            li.innerHTML = template;
            document.getElementById('leader-board').appendChild(li);

        });
    });

    api.post('/api/update-score', {
        matchId: window.match.id,
        playerId: window.player.id,
        score: yourScore
    }, function () {


        setTimeout(function () {

            api.get('/api/match-results/' + window.player.id, function (results) {

                results.forEach(item => {
                    item.match_complete_date = new Date(item.match_complete_date);
                    if (item.player_1_id === window.player.id) {
                        if (item.player_1_score > item.player_2_score) {
                            item.result = 'WON';
                        } else if (item.player_1_score === item.player_2_score) {
                            item.result = 'TIE';
                        } else {
                            item.result = 'LOSS';
                        }
                        item.yourScore = item.player_1_score;
                        item.opponentScore = item.player_2_score;
                        item.opponentName = item.player_2_name;
                    } else {
                        if (item.player_2_score > item.player_1_score) {
                            item.result = 'WON';
                        } else if (item.player_1_score === item.player_2_score) {
                            item.result = 'TIE';
                        } else {
                            item.result = 'LOSE';
                        }
                        item.yourScore = item.player_2_score;
                        item.opponentScore = item.player_1_score;
                        item.opponentName = item.player_1_name;
                    }

                    var template = document.getElementById('match-result-item-template').innerHTML;
                    template = template.replace('{{player1}}', item.player_1_name);
                    template = template.replace('{{player2}}', item.player_2_name);
                    template = template.replace('{{opponentName}}', item.opponentName);
                    template = template.replace('{{result}}', item.result);
                    template = template.replace('{{yourScore}}', item.yourScore);
                    template = template.replace('{{opponentScore}}', item.opponentScore);
                    var li = document.createElement('li');

                    li.innerHTML = template;



                    document.getElementById('match-list').appendChild(li);


                });

                var div = document.getElementById('my-matches-div');
                div.style.display = 'block';
                div.classList.add('slide-in');
                setTimeout(function () {
                    div.classList.remove('slide-in')
                }, 1000);

            });
        }, 1000);
    });
}