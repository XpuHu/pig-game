const player_1 = document.getElementById('player-1');
const player_2 = document.getElementById('player-2');
let score_1 = document.getElementById('score-1');
let score_2 = document.getElementById('score-2');
let total_1 = document.getElementById('total-1');
let total_2 = document.getElementById('total-2');
const btn_reset = document.querySelector('.btn-reset');
const btn_roll = document.querySelector('.btn-roll');
const btn_hold = document.querySelector('.btn-hold');
const dice = document.querySelector('.dice');
let currentPlayer;

initGame();

btn_reset.addEventListener('click', resetGame);
btn_roll.addEventListener('click', roll);
btn_hold.addEventListener('click', hold);

function initGame() {
    player_1.classList.add('player-active');
    score_1.textContent = '';
    score_2.textContent = '';
    total_1.textContent = 0;
    total_2.textContent = 0;
    currentPlayer = player_1;
}

function resetGame() {
    initGame();
    player_2.classList.remove('player-active');
    player_1.classList.remove('player-winner');
    player_2.classList.remove('player-winner');
    dice.removeAttribute('src');
}

function roll() {
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    displayDice(randomNumber);
    if (randomNumber === 1) {
        resetScore(currentPlayer);
        switchPlayer();
    } else {
        increaseScore(currentPlayer, randomNumber);
    }
}

function hold() {
    const score = Number(getPlayerScore(currentPlayer).textContent);
    setPlayerTotal(currentPlayer, score);
    const currentPlayerTotal = Number(
        getPlayerTotal(currentPlayer).textContent
    );
    if (currentPlayerTotal >= 100) {
        endGame();
    } else {
        switchPlayer();
    }
}

function displayDice(number) {
    dice.setAttribute('src', `img/dice-${number}.png`);
}

function resetScore(player) {
    const score = getPlayerScore(player);
    score.textContent = '';
}

function getPlayerNumber(player) {
    return +player.id.split('-')[1];
}

function getPlayerScore(player) {
    const number = getPlayerNumber(player);
    return number === 1 ? score_1 : score_2;
}

function increaseScore(player, number) {
    const score = getPlayerScore(player);
    score.textContent = Number(score.textContent) + number;
}

function switchPlayer() {
    const oldPlayer = currentPlayer;
    const number = getPlayerNumber(oldPlayer);
    const newPlayer = number === 1 ? player_2 : player_1;
    currentPlayer = newPlayer;
    oldPlayer.classList.remove('player-active');
    currentPlayer.classList.add('player-active');

    const score = getPlayerScore(oldPlayer);
    score.textContent = '';
}

function getPlayerTotal(player) {
    const number = getPlayerNumber(player);
    return number === 1 ? total_1 : total_2;
}

function setPlayerTotal(player, score) {
    const currentTotal = getPlayerTotal(player);
    currentTotal.textContent = Number(currentTotal.textContent) + score;
}

function endGame() {
    btn_hold.classList.add('hidden');
    btn_roll.classList.add('hidden');

    currentPlayer.classList.add('player-winner');
}
