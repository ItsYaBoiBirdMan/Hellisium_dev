const CWIDTH = 100;
const CHEIGHT = 140;
const STATHEIGHT = 125

class Card {
    constructor(id, name, atk, hp, x, y, place) {
        this.id=id;
        this.name = name;
        this.atk = atk;
        this.hp = hp;
        this.x = x;
        this.y = y;
        this.enabled = true;
        this.selected = false;
        this.place = place
    }
    draw() {
        if (this.selected) {
            fill(100, 200, 100);
        } else if (this.attacked) {
            fill(200, 100, 100)
        } else {
            fill(100, 100, 100);
        }
        strokeWeight(3);
        if (this.enabled) {
            stroke(200, 0, 0);
        } else {
            stroke(0, 0, 0);
        }

        rect(this.x, this.y, CWIDTH, CHEIGHT, 2, 2, 2, 2);
        fill(0, 0, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(this.name, this.x + CWIDTH / 2, this.y + CHEIGHT / 10);
        textAlign(LEFT, CENTER);
        text("HP: " + this.hp, this.x + 55, this.y + STATHEIGHT);
        text("ATK: " + this.atk, this.x + 10, this.y + STATHEIGHT);
    }
    getId() { return this.id;}
    
    getHp() { return this.hp; }
    setHp(hp) { this.hp = hp }
    
    enable() { this.enabled = true }
    disable() { this.enabled = false }
    
    isSelected() { return this.selected; }
    deselect() {this.selected = false;}

    clicked(x, y) {
        if (this.enabled) {
            if (this.x <= x && (this.x + CWIDTH) >= x &&
                this.y <= y && (this.y + CHEIGHT) >= y) {
                this.selected = !this.selected;
                return true;
            }
        }
        return false;
    }

}