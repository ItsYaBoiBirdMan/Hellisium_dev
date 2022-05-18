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

var myCards
var opCards

async function setup() {
    var canvas = createCanvas(width, height);
    canvas.parent('game');
    let myInfo = await requestPlayerInfoById(1)
    let opInfo = await requestPlayerInfoById(2)
    playerId = myInfo.player_id
    loadCards()
}

async function loadCards () {
    myCards = await requestPlayerDeck(1);
    opCards = await requestPlayerDeck(2);
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
                HANDX + CARDSPACE * (handPos - 3), HANDY.lower, card.deck_card_place)); // change the card placement 
            } else {
                hand.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * handPos, HANDY.upper, card.deck_card_place));
            }
        } else if (card.deck_card_place != 1 && card.deck_card_place != 8) {
            table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
            TABLEX + CARDSPACE * tablePos, TABLEY, card.deck_card_place));
            tablePos++;
        }
    }
}
    
async function draw() {
    background(220);
    for (let card of hand){
        card.draw();
    }
    for (let card of table){
        card.draw();
    }
}

async function PlaceCard (pId, cId, plcId) {
    
}
