const width = 1400;
const height = 600;

var playerId;
var gameover;
var scoreBoard;

const CARDSPACE = 120;

var hand = [];
const HANDX = 900;
const HANDY = {};
HANDY.upper = 270
HANDY.lower = HANDY.upper + 155

var table = [];
const TABLEX = 400;
const TABLEY = 200;
var opponent = [];

const OPX = 400;
const OPY = 20;

var cards

async function loadInfoBoard() {
    let myCards = await requestPlayerDeck(1);
    let opCards = await requestPlayerDeck(2);
    InfoBoard = new PlayerInfoBoard(myCards.player_id, myCards.player_name, opCards.player_name, myCards.player_hp, opCards.player_hp);
}


async function setup() {
    var canvas = createCanvas(width, height);
    canvas.parent('game');
    let myCards = await requestPlayerDeck(1);
    let opCards = await requestPlayerDeck(2);
    playerId = myCards.player_id
    let handPos = 0;
    hand = [];
    let tablePos = 0;
    table = [];
    let opPos = 0;
    opponent = [];
    for (let card of myCards) {
        if (card.deck_card_place === 1) {
            handPos++;
            if (handPos > 3){
                hand.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * (handPos - 3), HANDY.lower));
            } else {
                hand.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * handPos, HANDY.upper));
            }
        } 
    }
    loadInfoBoard();
}
async function draw() {
    background(220);
    for (let card of hand){
        card.draw();
    }
    InfoBoard.draw()
}
