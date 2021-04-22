// =======================================
// Ball
// ---------------------------------------
class Ball {
    constructor(x, y, radius, color, speed) {
        this.original_x = x;
        this.original_y = y;
        this.originalSpeed = speed;
        this.prev_x = x;
        this.prev_y = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx;
        this.dy;
        this.ballIsPaused;
        this.deltaSpeed = 0.10;
        this.ballResetDelay = 2000;
        this.resetBall();
    }

    // called every frame; updates the position of the ball
    update() { 
        if (this.ballIsPaused) return;
        this.prev_x = this.x;
        this.prev_y = this.y;
        this.x += this.dx;
        this.y += this.dy;
    }

    // called every frame; handles collisions between the ball and other objects
    checkCollisions(player, enemy, walls, pits, scoreboard) { 
        this.checkCollision_ballPlayer(player);
        this.checkCollision_ballEnemy(enemy);
        this.checkCollision_ballWalls(walls);
        this.checkCollision_ballPits(pits, scoreboard);
    }

    // called every frame; draws the ball to the canvas
    render(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0.0, Math.PI * 2, true);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

     // returns the x, y coodinate at the enemy's goal where the ball is on trajectory to land.
     predictBallMovingUpward(gameManager, enemy) {
        // take the ball's current postion and extrapolate based on movement
        //  directions to determine where it will hit on the enemy's side of 
        //  the map. The enemy player can use this to return the ball. 

        if (this.dy > 0) return null;
        let x = this.x;
        let y = this.y;
        let dx = this.dx;
        let dy = this.dy;
        let prev_xy = { x: this.x, y: this.y };
        let curr_xy = prev_xy;
        let paddleBottom_y = enemy.paddle.y + enemy.paddle.height / 2.0

        while (y > paddleBottom_y) { 
            prev_xy = { x: x, y: y };
            x += dx; 
            y += dy 
            if      (x - this.radius < 0.0) dx = -dx;
            else if (x + this.radius > gameManager.width) dx = -dx; 
            curr_xy = { x: x, y: y }; 
        }

        let traceLine = { pt1: prev_xy, pt2: curr_xy };
        let goalPost1 = { x: 0.0,               y: paddleBottom_y };
        let goalPost2 = { x: gameManager.width, y: paddleBottom_y };
        let goalLine  = { pt1: goalPost1, pt2: goalPost2 };
        let intersection = Geometry.getIntersection(traceLine, goalLine);

        return (intersection != null) ? intersection.x : null;
    }

    // =======================================
    // Helper Methods
    // ---------------------------------------

    // interpolate the ball's position between frames to determine whether it hit the 
    //  player's paddle. if hit, increase the speed of the ball and determin how it 
    //  should bounce away. 
    checkCollision_ballPlayer(player) {
        if (this.dy > 0) {
            // interpolate position
            let ball_t1 = { x: this.x, y: this.y };
            let ball_t0 = { x: this.x - this.dx, y: this.y - this.dy };
            let ballLine = { pt1: ball_t0, pt2: ball_t1 };
            let paddleLeft  = { x: player.paddle.x - player.paddle.width / 2 - 5.0, y: player.paddle.y - player.paddle.height / 2.0 };
            let paddleRight = { x: player.paddle.x + player.paddle.width / 2 + 5.0, y: player.paddle.y - player.paddle.height / 2.0 };
            let paddLine = { pt1: paddleLeft, pt2: paddleRight };
            let intersection = Geometry.getIntersection(ballLine, paddLine);
            if (intersection != null) {
                this.getDeflectionPlayer(player.paddle, intersection);
                this.increaseSpeed();
                this.adjustBallPos(intersection);
            }
        }
    }

    // interpolate the ball's position between frames to determine whether it hit the 
    //  enemy's paddle. if hit, increase the speed of the ball and determin how it 
    //  should bounce away. 
    checkCollision_ballEnemy(enemy) {
        if (this.dy < 0) {
            // interpolate position
            let ball_t1 = { x: this.x, y: this.y };
            let ball_t0 = { x: this.x - this.dx, y: this.y - this.dy };
            let ballLine = { pt1: ball_t0, pt2: ball_t1 };
            let paddleLeft  = { x: enemy.paddle.x - enemy.paddle.width / 2 - 5.0, y: enemy.paddle.y + enemy.paddle.height / 2.0 };
            let paddleRight = { x: enemy.paddle.x + enemy.paddle.width / 2 + 5.0, y: enemy.paddle.y + enemy.paddle.height / 2.0 };
            let paddLine = { pt1: paddleLeft, pt2: paddleRight };
            let intersection = Geometry.getIntersection(ballLine, paddLine)
            if (intersection != null) {
                this.getDeflectionEnemy(enemy.paddle, intersection);
                this.increaseSpeed();
                this.adjustBallPos(intersection);
            }
        }
    }

    // simple boundry check to see if ball hit the left or right walls. 
    checkCollision_ballWalls(walls) {
        // ball --> wall collision
        let leftWall;
        let rightWall;
        for (const wall of walls) {
            if      (wall.tagName === "leftWall") leftWall = wall;
            else if (wall.tagName === "rightWall") rightWall = wall;
        }
        let leftBoundary  = leftWall.x1;
        let rightBoundary = rightWall.x1;
        let ballLeft  = this.x - ball.radius;
        let ballRight = this.x + ball.radius;
       
        // boundary check
        if      (ballLeft  <= leftBoundary)  { this.flipXDirection(); }
        else if (ballRight >= rightBoundary) { this.flipXDirection(); }
    }

    // simple boundry check to see if ball hit the upper or lower pit.
    checkCollision_ballPits(pits, scoreboard) {
        // ball --> pit collision
        let upperPit;
        let lowerPit;
        for (const pit of pits) {
            if      (pit.tagName === "upperPit") upperPit = pit;
            else if (pit.tagName === "lowerPit") lowerPit = pit;
        }
        let upperBoundary = upperPit.y1;
        let lowerBoundary = lowerPit.y1;
        let ballTop = this.y - ball.radius;
        let ballBottom = this.y + ball.radius;
       
        // boundary check
        if      (ballTop    <= upperBoundary) { scoreboard.score1++; this.resetBall(); }
        else if (ballBottom >= lowerBoundary) { scoreboard.score2++; this.resetBall(); }
    }

    // determines the inital dx and dy of the ball. 
    getInitSpeed(initSpeed) {
        let rand = Math.random();
        let A = initSpeed * rand / 1.2;
        let B = Math.sqrt(initSpeed * initSpeed - A * A);
        let signA = Math.random() - 0.5;    
        let signB = Math.random() - 0.5;
        let dx = (signA < 0) ? A * -1.0 : A;
        let dy = (signB < 0) ? B * -1.0 : B;

        return { x: dx, y: dy };
    }

    // increase the speed of the ball. the speed increases should become 
    //  less and less as the game progresses. 
    increaseSpeed() { 
        this.dx += this.dx * this.deltaSpeed;
        this.dy += this.dy * this.deltaSpeed;
        this.deltaSpeed *= 0.9;
    }

    // returns the current speed of the ball. 
    getSpeed() {
        return Math.sqrt(this.dx*this.dx + this.dy*this.dy);
    }

    // corrects the ball position when it collides with the paddle. this correction
    //  allows the ball to bounce from the exact postion that it connected with 
    //  the paddle. Otherwise the ball would dig into the paddle or pass through 
    //  it all together before it knows to reflect off the paddle's surface. 
    adjustBallPos(intersection) {
        let sign = (this.dy > 0) ? 1.0 : -1.0;
        this.x = intersection.x;
        this.y = intersection.y + sign * this.radius
    }

    // calculates the angle of reflection for when the ball hits the player's paddle. 
    //  the reflection depends on the lateral position of the collision on the paddle. 
    //  middle of paddle = ball goes straight up
    //  left side of paddle = ball goes left
    //  right side of paddle = ball goes right
    getDeflectionPlayer(paddle, intersection) {
        let paddleCenter = paddle.x;
        let distFromPaddleCenter = intersection.x - paddleCenter;
        let normalizedDist = distFromPaddleCenter / (paddle.width / 2.0);
        let ang = normalizedDist * Math.PI / 3.0;
        let angPlus = -ang + Math.PI / 2.0
        let speed = this.getSpeed();
        let new_dx = speed * Math.cos(angPlus);
        let new_dy = speed * Math.sin(angPlus);
        this.dx = new_dx;
        this.dy = -new_dy;
    }

    // calculates the angle of reflection for when the ball hits the player's paddle. 
    //  see getDeflectionPlayer() for details. 
    getDeflectionEnemy(paddle, intersection) {
        let paddleCenter = paddle.x;
        let distFromPaddleCenter = intersection.x - paddleCenter;
        let normalizedDist = distFromPaddleCenter / (paddle.width / 2.0);
        let ang = normalizedDist * Math.PI / 3.0;
        let speed = this.getSpeed();
        let angPlus = ang + Math.PI / 2.0
        let new_dx = speed * Math.cos(angPlus);
        let new_dy = speed * Math.sin(angPlus);
        this.dx = -new_dx;
        this.dy = new_dy;
    }

    // chanages the lateral direction of the ball. 
    flipXDirection() {
        this.dx = -this.dx;
    }

    // to be used with async functions. Sets a waiting period
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // resets the ball to the middle of map. 
    async resetBall() {
        this.x = this.original_x;
        this.y = this.original_y;
        this.dx = 0;
        this.dy = 0;
        this.deltaSpeed = 0.10;

        let newSpeed = this.getInitSpeed(this.originalSpeed);
        this.dx = newSpeed.x;
        this.dy = newSpeed.y;

        this.ballIsPaused = true;
        await this.sleep(this.ballResetDelay);
        this.ballIsPaused = false;
    }
}