const width = 1400;
const height = 800;

var myInfo;
var opInfo;
var gameInfo;

var myHp
var opHp

const CARDSPACE = 140;

var mySlots = []
var opSlots = []

var hand = [];
const HANDX = 1050;
const HANDY = {};
HANDY.upper = 280;
HANDY.middle = HANDY.upper + 175
HANDY.lower = HANDY.middle + 175

var mytable = [];
var optable = []
const TABLE = {}
TABLE.one = {}
TABLE.two = {}
TABLE.three = {}
TABLE.four = {}
TABLE.five = {}
TABLE.six = {}

TABLE.one.x = 250
TABLE.one.y = 480

TABLE.two.x = TABLE.one.x + CARDSPACE
TABLE.two.y = TABLE.one.y

TABLE.three.x = TABLE.two.x + CARDSPACE
TABLE.three.y = TABLE.one.y

TABLE.four.x = TABLE.one.x
TABLE.four.y = TABLE.one.y + 170

TABLE.five.x = TABLE.two.x
TABLE.five.y = TABLE.four.y

TABLE.six.x = TABLE.three.x
TABLE.six.y = TABLE.four.y

var opponent = [];

const OPSPACE = 375

var myCards
var opCards

let enemyVisible = false
let cardsPlaceable = true

async function setup() {
    noLoop()
    var canvas = createCanvas(width, height);
    canvas.parent('game');
    loadCards()
    loadBoard()
    loadInfo()
    loop()  
    
}

async function loadInfo() {
    myInfo = await requestPlayerInfoById(playerId)
    opInfo = await requestPlayerInfoById(opponentId)
    gameInfo = await requestGameInfoById(gameId)
    for(let game of gameInfo) {
        if (game.game_state === 2){
            enemyVisible = true
            cardsPlaceable = false
        } else {
            enemyVisible = false
            cardsPlaceable = true
        }
    }
    
}
    

async function loadBoard () {
    mySlots = []
    opSlots = []
    for(let i = 0; i < 6; i++){
        if (i < 3) {
            mySlots.push(new Slot(250 + CARDSPACE * i, 480, i + 2))
            opSlots.push(new Slot(250 + CARDSPACE * i, 480 - OPSPACE, i + 5))
        } else {
            mySlots.push(new Slot(250 + CARDSPACE * (i - 3), 650, i + 2))
            opSlots.push(new Slot(250 + CARDSPACE * (i - 3), 650 - OPSPACE, i - 1))
        }
        
    }
}

async function loadCards () {
    myCards = await requestPlayerDeck(playerId);
    opCards = await requestPlayerDeck(opponentId);
    let handPos = 0;
    hand = [];
    
    mytable = [];
    optable = []

    opponent = [];
    for (let card of myCards) {
        if (card.deck_card_place === 1) {
            handPos++;
            if (handPos > 2 && handPos <= 4){
                hand.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * (handPos - 2), HANDY.middle, card.deck_card_place, card.deck_card_attacked));
            } else if (handPos > 4) {
                hand.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * (handPos - 4), HANDY.lower, card.deck_card_place, card.deck_card_attacked));
            } else {
                hand.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                HANDX + CARDSPACE * handPos, HANDY.upper, card.deck_card_place, card.deck_card_attacked));
            }
        } else if (card.deck_card_place != 1 && card.deck_card_place != 8) {
                if (card.deck_card_place === 2) {
                    mytable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.one.x, TABLE.one.y, card.deck_card_place, card.deck_card_attacked));
                } else if (card.deck_card_place === 3) {
                    mytable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.two.x, TABLE.two.y, card.deck_card_place, card.deck_card_attacked));
                } else if (card.deck_card_place === 4) {
                    mytable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.three.x, TABLE.three.y, card.deck_card_place, card.deck_card_attacked));
                } else if (card.deck_card_place === 5) {
                    mytable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.four.x, TABLE.four.y, card.deck_card_place, card.deck_card_attacked));
                } else if (card.deck_card_place === 6) {
                    mytable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.five.x, TABLE.five.y, card.deck_card_place, card.deck_card_attacked));
                } else if (card.deck_card_place === 7) {
                    mytable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                    TABLE.six.x, TABLE.six.y, card.deck_card_place, card.deck_card_attacked));
                } 
            
        }
    }
    for (let card of opCards) {
        if (card.deck_card_place != 1 && card.deck_card_place != 8) {
            if (card.deck_card_place === 5) {
                optable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.one.x, TABLE.one.y - OPSPACE, card.deck_card_place, card.deck_card_attacked));
            } else if (card.deck_card_place === 6) {
                optable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.two.x, TABLE.two.y - OPSPACE, card.deck_card_place, card.deck_card_attacked));
            } else if (card.deck_card_place === 7) {
                optable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.three.x, TABLE.three.y - OPSPACE, card.deck_card_place, card.deck_card_attacked));
            } else if (card.deck_card_place === 2) {
                optable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.four.x, TABLE.four.y - OPSPACE, card.deck_card_place, card.deck_card_attacked));
            } else if (card.deck_card_place === 3) {
                optable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.five.x, TABLE.five.y - OPSPACE, card.deck_card_place, card.deck_card_attacked));
            } else if (card.deck_card_place === 4) {
                optable.push(new Card(card.deck_card_id, card.card_name, card.card_atk, card.deck_current_hp, 
                TABLE.six.x, TABLE.six.y - OPSPACE, card.deck_card_place, card.deck_card_attacked));
            } 
        }
    }
}
    
function draw() {
    clear();
    for (let slot of mySlots){
        slot.draw()
    }

    for (let slot of opSlots){
        slot.draw()
    }
    
    for (let card of hand){
        card.draw();
    }
    for (let card of mytable){
        card.draw();
    }
    for(let card of optable){
        if(enemyVisible){
            card.draw()
        }
    }
}

async function mousePressed() {
    let card
    let tableCard

    card = returnSelected(hand);
    tableCard = returnSelected(mytable)
    
    if (cardsPlaceable){
        if (card) {
            card.click(mouseX, mouseY);
        } else {
            for (let card of hand){
                card.click(mouseX, mouseY);
            } 
        }
    }
    
     if (card) {
    
        for (let slot of mySlots){
            if (slot.click(mouseX, mouseY)) {
                if (mytable.length < 3){    
                    card.deselect();
                    placeCard(playerId, card, slot);
                } else {
                    slot.deselect();
                    card.deselect();
                }
            }
        }
    } if (cardsPlaceable){
        for (let card of mytable) {
            if (card.click(mouseX, mouseY)) { 
                card.deselect();
                returnCard(playerId, card)              
            } 
        }
    } else {        
        if (tableCard){
            tableCard.click(mouseX, mouseY);
        } else {
            for (let card of mytable) {
                if(card.click(mouseX, mouseY)){
                    let myCardAtk = card.getAtk()
                    console.log(myCardAtk)

                }
            }
        }

        if(tableCard){
            for (let card of optable) {
                let attacked = tableCard.hasAttacked()
                if (card.click(mouseX, mouseY)){
                   await attackOpponentCard(playerId, tableCard.getAtk(), card.getId(), opponentId);
                   await requestSetAttacked(tableCard.getId(), playerId)
                }
            }
        }
    }
    for (let card of optable) {
        if(card.getHp() <= 0){
            removeCard(opponentId, card.getId())
       } else {
            returnCard(opponentId, card.getId())
       }
    }
    for (let card of mytable) {
        if(card.getHp() <= 0){
            removeCard(playerId, card.getId())
       } else {
            returnCard(playerId, card.getId())
       }
    }
}

async function placeCard(pId, card, slot) {
    await requestPlaceCardOnSlot(pId, card.getId(), slot.getId())
    await loadCards();
    await loadBoard();
}

async function returnCard(pId, card){
    await requestReturnCardToHand(pId, card.getId())
    await loadCards();
    await loadBoard();
}

function returnSelected(cardList) {
    for(let card of cardList) {
        if (card.isSelected()) return card;
    }
    return null;
}

async function attackOpponentCard(pId, cardatk, target, opId){
    await requestAttackCard(pId, cardatk, target, opId)
    await loadBoard()
    await loadCards()
}

async function removeCard(pId, card){
    await requestRemoveCard(pId, card)
    await loadBoard();
    await loadCards();
}