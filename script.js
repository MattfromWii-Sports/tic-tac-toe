
const places = document.querySelectorAll('#grid>.cells');

const player = ((char, stat) => {
    this.token = char;
    this.turn = stat;
    return {token, turn};
});

const player1 = player('O', true);
const player2 = player('X', false);

const gameboard = (() => {
    const gamePlaces = new Array(9);
    
    places.forEach(x => x.addEventListener('click', (e) => {
        if (gamePlaces[e.target.dataset.type] !== undefined) return; //if place in array occupied
        if (player1.turn === true) { //player1 turn
            e.target.textContent = player1.token;
            gamePlaces.splice(e.target.dataset.type, 1, player1.token);
            player1.turn = false;
            player2.turn = true;

        } else if (player2.turn === true) { //player2 turn
            e.target.textContent = player2.token;
            gamePlaces.splice(e.target.dataset.type, 1, player2.token);
            player2.turn = false;
            player1.turn = true;

        }
        console.log(`board game array: ${gamePlaces}`);
    }));

    /*const checkWinner = ((playerToken) => {
        const tempTokenPlaces = [];
        for(let i = 0; i < 9; i++) {
            if (gamePlaces[i] === playerToken) tempTokenPlaces.push(i);
        }
        if (tempTokenPlaces.every(x => x.includes(0, 1)));
        console.log(`Temporary Array: ${tempTokenPlaces}`);
    });*/

    return {gamePlaces};
})();