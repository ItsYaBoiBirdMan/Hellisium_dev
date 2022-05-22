const width = 1400;
const height = 700;

var myInfo;
var opInfo;
var gameInfo;

var myHp
var opHp

const CARDSPACE = 120;

var mySlots = []
var opSlots = []

var hand = [];
const HANDX = 1100;
const HANDY = {};
HANDY.upper = 300
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

TABLE.one.x = 250
TABLE.one.y = 460

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

const OPSPACE = 370

var myCards
var opCards

async function setup() {
    noLoop()
    var canvas = createCanvas(width, height);
    canvas.parent('game');
    loadCards()
    loadBoard()
    loadInfo()
    loadInfo()
    loop()
    
}

async function loadInfo() {
    myInfo = await requestPlayerInfoById(1)
    opInfo = await requestPlayerInfoById(2)
    gameInfo = await requestGameInfoById(1)
}
    

async function loadBoard () {
    for(let i = 0; i < 6; i++){
        if (i < 3) {
            mySlots.push(new Slot(250 + CARDSPACE * i, 460, i + 2))
            opSlots.push(new Slot(250 + CARDSPACE * i, 460 - OPSPACE, i + 2))
        } else {
            mySlots.push(new Slot(250 + CARDSPACE * (i - 3), 610, i + 2))
            opSlots.push(new Slot(250 + CARDSPACE * (i - 3), 610 - OPSPACE, i + 2))
        }
        
    }
}

async function loadCards () {
    myCards = await requestPlayerDeck(1);
    opCards = await requestPlayerDeck(2);
    
    let handPos = 0;
    hand = [];
    
    table = [];

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
    for (let card of opCards) {
        if (card.deck_card_place != 1 && card.deck_card_place != 8) {
            if (card.deck_card_place === 2) {
                table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.one.x, TABLE.one.y - OPSPACE, card.deck_card_place));
            } else if (card.deck_card_place === 3) {
                table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.two.x, TABLE.two.y - OPSPACE, card.deck_card_place));
            } else if (card.deck_card_place === 4) {
                table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.three.x, TABLE.three.y - OPSPACE, card.deck_card_place));
            } else if (card.deck_card_place === 5) {
                table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.four.x, TABLE.four.y - OPSPACE, card.deck_card_place));
            } else if (card.deck_card_place === 6) {
                table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.five.x, TABLE.five.y - OPSPACE, card.deck_card_place));
            } else if (card.deck_card_place === 7) {
                table.push(new Card(card.deck_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.six.x, TABLE.six.y - OPSPACE, card.deck_card_place));
            } 
        }
    }
}
    
function draw() {
    background(220);
    for (let slot of mySlots){
        slot.draw()
    }

    for (let slot of opSlots){
        slot.draw()
    }
    
    for (let card of hand){
        card.draw();
    }
    for (let card of table){
        card.draw();
    }
}

async function PlaceCardOnSelectedSlot (pId, cId, plcId) {
    await requestPlaceCardOnSlot(pId, cId, plcId)
}

async function mousePressed() {
    let card
    
    card = returnSelected(hand);
    if (card) {
        card.click(mouseX, mouseY);
    } else {
        for (let card of hand){
            card.click(mouseX, mouseY);
        } 
    }
     if (card) {
    
        for (let slot of mySlots){
            if (slot.click(mouseX, mouseY)) {//getting weird errors, creates a loops of varying lenghts and I can select a card until they are over
                    card.deselect();
                    placeCard(card, slot);
            }
        }
    } for (let card of table) {
        if (card.click(mouseX, mouseY)) { 
            card.deselect();
            returnCard(card)              
        }
    }
}

async function placeCard(card, slot) {
    await PlaceCardOnSelectedSlot(1, card.getId(), slot.getId());
    await loadCards();
    await loadBoard();
}

async function returnCard(card){
    await requestReturnCardToHand(1, card.getId())
    await loadCards();
    await loadBoard();
}

function returnSelected(cardList) {
    for(let card of cardList) {
        if (card.isSelected()) return card;
    }
    return null;
}