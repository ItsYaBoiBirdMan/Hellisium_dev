const CWIDTH = 120;
const CHEIGHT = 160;
const HPHEIGHT = 63
const ATKHEIGHT = 59

class Card {
    constructor(id, name, atk, hp, x, y, place) {
        this.id = id;
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.selected = false;
        this.place = place
        this.image = loadImage("./assets/cards/Card_" + this.id + ".png")
    }
    draw() {
        if (this.selected) {
            fill(100, 200, 100);
        } else {
            fill(200, 200, 800);
        }
        strokeWeight(5);
        if (this.selected) {
            stroke(200, 0, 0);
        } else {
            stroke(0, 0, 0);
        }
        rectMode(CENTER)
        rect(this.x, this.y, CWIDTH, CHEIGHT, 2, 2, 2, 2);
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        imageMode(CENTER)
        image(this.image, this.x, this.y, CWIDTH, CHEIGHT)
        textAlign(CENTER, CENTER);
        textSize(18)
        text(this.hp, this.x + 29.5, this.y + HPHEIGHT);
        text(this.atk, this.x - 28, this.y + ATKHEIGHT);
    }
    getId() { return this.id;}

    getAtk() { return this.atk; }

    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp;  }
    
    
    isSelected() { return this.selected; }
    deselect() {this.selected = false;}

    click(x, y) {
        if ((this.x - CWIDTH / 2) <= x && (this.x + CWIDTH / 2) >= x &&
            (this.y - CHEIGHT / 2) <= y && (this.y + CHEIGHT / 2) >= y) {
            this.selected = !this.selected;
            return true;
        }
        return false;
    }

}