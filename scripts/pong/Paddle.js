// =======================================
// Paddle
// ---------------------------------------
class Paddle {
    constructor(width, height, x, y, color, dx) {
        this.width = width;
        this.height = height;
        this.prev_x;
        this.x = x;
        this.y = y;
        this.color = color;
        this.dx = dx;
        this.dy = 0.0;
    }

    // called every frame; handles collisions between the paddle and walls
    checkCollisions(walls) {
        let leftWall;
        let rightWall;
        for (const wall of walls) {
            if      (wall.tagName === "leftWall") leftWall = wall;
            else if (wall.tagName === "rightWall") rightWall = wall;
        }
        let leftBoundary  = leftWall.x1;
        let rightBoundary = rightWall.x1;
        let paddleLeft  = this.x - this.width / 2.0;
        let paddleRight = this.x + this.width / 2.0;
       
        // boundary check
        if (paddleLeft  < leftBoundary)  this.x += leftBoundary - paddleLeft;
        if (paddleRight > rightBoundary) this.x -= paddleRight - rightBoundary;
    }
}
