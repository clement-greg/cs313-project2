var gameOverController = function () {
    //alert('game over');
    document.getElementById('main-game-board').style.display = 'none';
    document.body.style.overflow = 'auto';


    soundFx.playPacManIntro();

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

    // window.match = results;
    // window.player = player;
    var api = apiService();

    api.post('/api/update-score', {
        matchId: window.match.id,
        playerId: window.player.id,
        score: yourScore
    }, function () {
        console.log('saved');

        setTimeout(function () {

            api.get('/api/match-results/' + window.player.id, function (results) {
                console.log('my matches:');
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
                    console.log(template);


                    document.getElementById('match-list').appendChild(li);


                });
                console.log(results);
            });
        }, 1000);
    });
}