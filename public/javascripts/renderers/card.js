const CWIDTH = 100;
const CHEIGHT = 140;
const STATHEIGHT = 60

class Card {
    constructor(id, name, atk, hp, x, y, place) {
        this.id =id;
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.selected = false;
        this.place = place
    }
    draw() {
        if (this.selected) {
            fill(100, 200, 100);
        } else {
            fill(100, 100, 100);
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
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y - CHEIGHT / 2.5);
        textAlign(LEFT, CENTER);
        text("HP: " + this.hp, this.x + 6, this.y + STATHEIGHT);
        text("ATK: " + this.atk, this.x - 40, this.y + STATHEIGHT);
    }
    getId() { return this.id;}
    
    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp }
    
    
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