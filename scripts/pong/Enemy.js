// =======================================
// Enemy
// ---------------------------------------
class Enemy {
    constructor(paddle) {
        this.paddle = paddle;
        this.paddleAdjustment;
    }

    // called every frame; updates the position of the enemy paddle
    update(ball, gameManager, player, frameCount) {
        // determine enemy color
        this.getEnemyColor(gameManager, ball);

        // determine speed 
        this.paddle.dx = this.calcSpeed(gameManager);

        // determine where the paddle shoudld move to (varies with difficulty level)
        let target_x = this.predictBallLandingPoint_x(gameManager, ball);

        // determine a left/right adjustment for the paddle (varies with difficulty level)
        if (frameCount % 60 === 1) this.paddleAdjustment = this.calcPaddleAdjustment(gameManager, player, target_x);

        // move the paddle 
        this.movePaddle(target_x);
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
    getEnemyColor(gameManager) {
        if   (gameManager.difficultyNightmare) { this.paddle.color = "#880808"; ball.color = "#880808"; }
        else                                   { this.paddle.color = "#00BFFF"; ball.color = "#00BFFF"; }
    }

    calcSpeed(gameManager) {
        if (gameManager.difficultyEasy)      return 2.0;
        if (gameManager.difficultyNormal)    return 4.0;
        if (gameManager.difficultyHard)      return 2.0;
        if (gameManager.difficultyNightmare) return 4.0;
    }

    // returns the x position that the computer player will move to. Harder difficulty
    //  levels give the computer player more accurate predictions
    predictBallLandingPoint_x(gameManager, ball) {
        if (gameManager.difficultyEasy)   return ball.x;

        if (gameManager.difficultyNormal) return ball.x;

        if      (gameManager.difficultyHard && ball.dy < 0) return ball.predictBallMovingUpward(gameManager, this);
        else if (gameManager.difficultyHard && ball.dy > 0) return gameManager.width / 2.0;

        if      (gameManager.difficultyNightmare && ball.dy < 0) return ball.predictBallMovingUpward(gameManager, this);
        else if (gameManager.difficultyNightmare && ball.dy > 0) return gameManager.width / 2.0;
    }

    // by default, the computer player tries to line up the ball with the middle of his 
    //  paddle--returning the ball in a straight line. Harder difficutlty settings add
    //  a left/right adjustment to change force the ball to return to the left or right.
    calcPaddleAdjustment(gameManager, player, target_x) {
        if (gameManager.difficultyEasy)      return 0.0;
        if (gameManager.difficultyNormal)    return this.addRandomNoise();
        if (gameManager.difficultyHard)      return this.addRandomNoise();
        if (gameManager.difficultyNightmare) return this.calcStrikePoint(gameManager, player, target_x);
    }

    // moves the enemy paddle after accounting for the predicted future position of the 
    //  ball and the left/right adjustment. 
    movePaddle(target_x) {
        let dist = this.paddle.x + this.paddleAdjustment - target_x;
        if      (dist < 0 && Math.abs(dist) > this.paddle.dx) this.paddle.x += this.paddle.dx;
        else if (dist > 0 && Math.abs(dist) > this.paddle.dx) this.paddle.x -= this.paddle.dx;
        else if (dist < 0)                                    this.paddle.x += 1.0; // make small movements when the paddle is 
        else if (dist > 0)                                    this.paddle.x -= 1.0; // close to avoid thrashing back and forth
    }

    // returns a postive or negative distance from the center of the paddle
    //  max = right corner of the paddle
    //  min = left corner of the paddle
    addRandomNoise() {
        let rand = Math.random() - 0.5;
        let halfWidth = this.paddle.width / 2.0;
        return rand * halfWidth;
    }

    // calculates the position (left or right of center) on the paddle necessary 
    //  for the computer player to return the ball to the left or right corner 
    //  of the player's goal. 
    calcStrikePoint(gameManager, player, incoming_x) {
        // enemy will decide to aim for either the right or the left corner, and 
        //  trace back from there to the x position that the ball is currently on 
        //  course to strike. Enemy will calculate the required angle to bank the
        //  shot, and will subsequently move his paddle to the sweet spot that 
        //  will send the ball on that trajectory. 

        let aimLeft = player.paddle.x < (gameManager.width / 2.0);
        let target_xy = (aimLeft) ? { x: 0.0, y: gameManager.height } : { x: gameManager.width, y: gameManager.height };

        let incoming_y = player.paddle.height / 2.0 + 10.0;

        let incoming_xy = { x: incoming_x, y: incoming_y };
        let reference_xy = { x: incoming_x, y: gameManager.height };
        let angle = Geometry.get3PointAngle(incoming_xy, reference_xy, target_xy);

        let cosAng = Math.cos(angle);
        let distFromCenter = cosAng * this.paddle.width / 2.0;

        let adjDistFromCenter = distFromCenter / 2.8;

        return (aimLeft) ? adjDistFromCenter : -adjDistFromCenter;        
    }
}