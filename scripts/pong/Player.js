// =======================================
// Player
// ---------------------------------------
class Player {
    constructor(paddle) {
        this.paddle = paddle;
    }

    // called every frame; updates the position of the player paddle
    update(gameManager) { 
        this.calcPaddleSpeed(gameManager);

        let arrowLeft  = "37";
        let arrowRight = "39";
        for (const key in keysDown) {
            if      (key === arrowLeft)  { this.paddle.prev_x = this.paddle.x; this.paddle.x -= this.paddle.dx; }
            else if (key === arrowRight) { this.paddle.prev_x = this.paddle.x; this.paddle.x += this.paddle.dx; }

        }
    }

    // called every frame; handles collisions between the paddle and walls
    checkCollisions(walls) {
        // check paddle for collision with the side walls
        // if the paddle collides with the wall, move the paddle
        //  so that the side of the paddle lines up with the wall.
        this.paddle.checkCollisions(walls);
    }

    // called every frame; draws the paddle to the canvas
    render(context) {
        let left = this.paddle.x - this.paddle.width / 2.0;
        let top  = this.paddle.y - this.paddle.height / 2.0;

        context.beginPath();
        context.rect(left, top, this.paddle.width, this.paddle.height);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();

    }
    // =======================================
    // Helper Methods
    // ---------------------------------------
    calcPaddleSpeed(gameManager) {
        if (gameManager.difficultyNightmare) this.paddle.dx = 11.0
        else                                 this.paddle.dx = 7.0
    }

}