var gameOverController = function() {
    //alert('game over');
    document.getElementById('main-game-board').style.display = 'none';

    document.getElementById('game-over-display').style.display = 'table';

    var opponentScore = parseInt(document.getElementById('other-score').innerText);
    var yourScore = parseInt(document.getElementById('score').innerText);

    if(yourScore > opponentScore) {
        document.getElementById('you-win-panel').style.display = 'block';
    } else if(yourScore === opponentScore) {
        document.getElementById('you-tied-panel').style.display = 'block';
    } else {
        document.getElementById('you-lose-panel').style.display = 'block';
    }
}