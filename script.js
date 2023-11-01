
const places = document.querySelectorAll('#grid>.cells');

const player = ((token, stat) => {
    this.token = token;
    this.turn = stat;
    return {token, stat};
});

const player1 = player('O', true);
const player2 = player('X', false);

const gameboard = (() => {
    const gamePlaces = [null, null, null, null, null, null, null, null, null];

    places.forEach(x => x.addEventListener('click', (e) => {
        if (gamePlaces[e.target.dataset.type] !== null) return; //if place in array occupied
        if (player1.turn === true) { //player1 turn
            e.target.textContent = player1.token;
            gamePlaces.splice(e.target.dataset.type, 1, player1);
            player1.turn = false;
            player2.turn = true;
        } else { //player2 turn
            e.target.textContent = player2.token;
            gamePlaces.splice(e.target.dataset.type, 1, player2);
            player2.turn = false;
            player1.turn = true;
        }
        console.log(gamePlaces);
    }));

    return {gamePlaces};
})();