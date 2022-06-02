const CWIDTH = 100;
const CHEIGHT = 140;
const HPHEIGHT = 55
const ATKHEIGHT = 52

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
        strokeWeight(3);
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
        text(this.hp, this.x + 24.5, this.y + HPHEIGHT);
        text(this.atk, this.x - 24, this.y + ATKHEIGHT);
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