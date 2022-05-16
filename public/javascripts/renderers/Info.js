const WIDTH = 300;
const HEIGHT = 100;
const POSX = 10;
const POSY = 10;

class PlayerInfoBoard {
    constructor(id, playerName, opponentName, playerHp, opponentHp) {
        this.id = id;
        this.pName = playerName;
        this.oName = opponentName
        this.pHp = playerHp;
        this.oHp = opponentHp;
    }
    draw() {
        fill(100,200,100);
        stroke(0,0,0);
        rect (POSX,POSY,WIDTH,HEIGHT,5,5,5,5);
        fill(0,0,0);
        textAlign(LEFT,CENTER);
        text("Player: " + this.pName, POSX + 10, POSY + HEIGHT / 3);
        text("Opponent: " + this.oName, POSX + 10, POSY + 2 * HEIGHT / 3);
        text("HP: " + this.pHp, POSX + 140, POSY + HEIGHT / 3);
        text("HP: " + this.oHp, POSX + 140, POSY + 2 * HEIGHT / 3)
  
    }
}