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
    click(x, y){
        
    }
}