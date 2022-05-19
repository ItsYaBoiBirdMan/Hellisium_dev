const width = 1400;
const height = 600;

var playerId;
var gameover;
var scoreBoard;

const CARDSPACE = 120;

var hand = [];
const HANDX = 1050;
const HANDY = {};
HANDY.upper = 140
HANDY.middle = HANDY.upper + 155
HANDY.lower = HANDY.middle + 155

var table = [];
const TABLE = {}
TABLE.one = {}
TABLE.two = {}
TABLE.three = {}
TABLE.four = {}
TABLE.five = {}
TABLE.six = {}

TABLE.one.x = 200
TABLE.one.y = 300

TABLE.two.x = TABLE.one.x + CARDSPACE
TABLE.two.y = TABLE.one.y

TABLE.three.x = TABLE.two.x + CARDSPACE
TABLE.three.y = TABLE.one.y

TABLE.four.x = TABLE.one.x
TABLE.four.y = TABLE.one.y + 150

TABLE.five.x = TABLE.two.x
TABLE.five.y = TABLE.four.y

TABLE.six.x = TABLE.three.x
TABLE.six.y = TABLE.four.y

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
    table = [];
    let opPos = 0;
    opponent = [];
    for (let card of myCards) {
        if (card.deck_card_place === 1) {
            handPos++;
            if (handPos > 2 && handPos <= 4){
                hand.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * (handPos - 2), HANDY.middle, card.deck_card_place));
            } else if (handPos > 4) {
                hand.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * (handPos - 4), HANDY.lower, card.deck_card_place));
            } else {
                hand.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * handPos, HANDY.upper, card.deck_card_place));
            }
        } else if (card.deck_card_place != 1 && card.deck_card_place != 8) {
            if (table.length <= 3) {
                if (card.deck_card_place === 2) {
                    table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.one.x, TABLE.one.y, card.deck_card_place));
                } else if (card.deck_card_place === 3) {
                    table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.two.x, TABLE.two.y, card.deck_card_place));
                } else if (card.deck_card_place === 4) {
                    table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.three.x, TABLE.three.y, card.deck_card_place));
                } else if (card.deck_card_place === 5) {
                    table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.four.x, TABLE.four.y, card.deck_card_place));
                } else if (card.deck_card_place === 6) {
                    table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.five.x, TABLE.five.y, card.deck_card_place));
                } else if (card.deck_card_place === 7) {
                    table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.six.x, TABLE.six.y, card.deck_card_place));
                } 
            }
        }
    }
    for (let card of opCards) {
        
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
    text(table.length, 100, 100)
}

async function PlaceCard (pId, cId, plcId) {
    
}

