const WIDTH = 300;
const HEIGHT = 100;
const POSX = 10;
const POSY = 10;

class PlayerHpDisplay {
    constructor(id, hp, x, y) {
       this.id = id
       this.hp = hp
       this.x = x
       this.y = y
    }
    draw() {
        textAlign(LEFT,CENTER);
        text("HP: " + this.hp, x, y);
  
    }
}

