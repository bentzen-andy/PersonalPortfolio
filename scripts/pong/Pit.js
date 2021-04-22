// =======================================
// Pit
// ---------------------------------------
class Pit {
    constructor(tagName, pt1, pt2) {
        this.tagName = tagName;
        this.x1 = pt1.x;
        this.y1 = pt1.y;
        this.x2 = pt2.x;
        this.y2 = pt2.y;
        let pts = [pt1, pt2];
    }
}
