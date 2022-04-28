
const width = 400;
const height = 400;
const warpX = 150
const warpY = 200

var cards

async function setup() {
    var canvas = createCanvas(width, height);
    canvas.parent('game');
    cards = await getCard(2);
}
async function draw() {
    background(220);
    if (cards){
        textSize(30)
        text(cards.card_name, (width / 2) - 50, 50, warpX, warpY);
        text('ATK', (width / 2) - 57, 135, warpX, warpY);
        text('HP', (width / 2) + 17, 135, warpX, warpY);
        text(cards.card_hp, (width / 2) + 25, 170, warpX, warpY);
        text(cards.card_atk, (width / 2) - 40, 170, warpX, warpY);
    }
}

async function keyPressed() {
    if (keyCode === 49) {
        cards = await getCard(1);
    } else if (keyCode === 50) {
        cards = await getCard(2);
    } else if (keyCode === 51) {
        cards = await getCard(3);
    } else if (keyCode === 52) {
        cards = await getCard(4);
    } else if (keyCode === 53) {
        cards = await getCard(5);
    } else if (keyCode === 54) {
        cards = await getCard(6);
    }
  }