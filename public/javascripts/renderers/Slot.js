const SWIDTH = 100
const SHEIGHT = 140

class Slot{
    constructor(x, y, placeId){
        this.x = x
        this.y = y
        this.placeId = placeId
        this.selected = false
        this.occupied = false
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

    isSelected() { return this.selected; }
    deselect() {this.selected = false;}

    click(x, y) {
        if (!this.selected) {
            if ((this.x - (SWIDTH / 2)) <= x && (this.x + (SWIDTH / 2)) >= x &&
                (this.y - (SHEIGHT / 2)) <= y && (this.y + (SHEIGHT / 2)) >= y) {
                this.selected = !this.selected;
                return true;
            }
        } else if (this.selected){
            if ((this.x - (SWIDTH / 2)) <= x && (this.x + (SWIDTH / 2)) >= x &&
                (this.y - (SHEIGHT / 2)) <= y && (this.y + (SHEIGHT / 2)) >= y) {
                this.selected = !this.selected;
                return true;
            }
        }
        return false;
    }
}
/*If I select a slot, I can't deselect it or select a card
If I select a card first, I can select and deselect a slot
Most likely a problem on the logic
Need to ask the professor */