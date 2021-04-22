// =======================================
// Geometry
// --------------------------------------- 
class Geometry {
    
    // returns the (x,y) intersection of two lines 
    static getIntersection(line1, line2) {
        let pt0_x = line1.pt1.x;
        let pt0_y = line1.pt1.y;
        let pt1_x = line1.pt2.x;
        let pt1_y = line1.pt2.y;
        let pt2_x = line2.pt1.x;
        let pt2_y = line2.pt1.y;
        let pt3_x = line2.pt2.x;
        let pt3_y = line2.pt2.y;

        let intersection_x = 0;
        let intersection_y = 0;

        let s1_x = pt1_x - pt0_x;
        let s1_y = pt1_y - pt0_y;
        let s2_x = pt3_x - pt2_x;
        let s2_y = pt3_y - pt2_y;

        let s = (-s1_y * (pt0_x - pt2_x) + s1_x * (pt0_y - pt2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        let t = ( s2_x * (pt0_y - pt2_y) - s2_y * (pt0_x - pt2_x)) / (-s2_x * s1_y + s1_x * s2_y);

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            intersection_x = pt0_x + (t * s1_x);
            intersection_y = pt0_y + (t * s1_y);
            return { x: intersection_x, y: intersection_y };
        }

        return null;
    }

    // returns the distance between two 2D points
    static getDist(pt1, pt2) {
        if (pt1 == null || pt2 == null) return Number.NEGATIVE_INFINITY;
        return Math.sqrt((pt2.x - pt1.x) * (pt2.x - pt1.x) + (pt2.y - pt1.y) * (pt2.y - pt1.y));
    }

    // returns the unit circle angle in radians given a center point and a perimeter point
    static getAngleOnCircle(center, perimeterPt) {
        // take the negative of y because the Canvas y coordinates work in reverse
        return Math.atan2(perimeterPt.y - center.y, perimeterPt.x - center.x);
    }

    // returns inside angle of three 2D points. 
    static get3PointAngle(pt1, pt2, pt3) {
        // Law of cosines 
        let p12 = this.getDist(pt1, pt2);
        let p13 = this.getDist(pt1, pt3);
        let p23 = this.getDist(pt2, pt3);
        
        return Math.acos( (p12*p12 + p13*p13 - p23*p23) / (2.0 * p12 * p13) );
    }
}