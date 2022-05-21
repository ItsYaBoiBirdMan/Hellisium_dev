const SWIDTH = 100
const SHEIGHT = 140

class Slot{
    constructor(x, y, placeId){
        this.x = x
        this.y = y
        this.placeId = placeId
        this.selected = false

    }
    draw() {
        strokeWeight(3);
        if (this.selected) {
            stroke(200, 0, 0);
        } else {
            stroke(0, 0, 0);
        }
        noFill();
        rect(this.x, this.y, SWIDTH, SHEIGHT);
        strokeWeight(1)
        text(this.placeId, this.x, this.y)
    }

    getId() { return this.placeId;}

    isSelected() { return this.selected; }
    deselect() {this.selected = false;}


    click(x, y) {

           if ((this.x - SWIDTH / 2) <= x && (this.x + SWIDTH / 2) >= x &&
            (this.y - SHEIGHT / 2) <= y && (this.y + SHEIGHT / 2) >= y) {
            this.selected = !this.selected;
            return true;
        
    
        }     return false; 
    }
}
