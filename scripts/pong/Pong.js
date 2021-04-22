// =======================================
// Pong
// ---------------------------------------
class Pong {

    constructor(gameManager, ball, player, enemy, walls, pits, scoreboard) {
        this.gameManager = gameManager;
        this.ball = ball;
        this.player = player;
        this.enemy = enemy;
        this.walls = walls
        this.pits = pits;
        this.scoreboard = scoreboard;
        this.frameCount = 0;
    }

    // called once every frame; updates the (x, y) positions of all game objects
    update() {

        // keep track of a frame count to be used for things that need to happen periodically
        this.frameCount++;
        this.gameManager.update(this.scoreboard, this.ball);

        // prevent all animations if any of the menu screens are turned on
        if (gameManager.gameOver) return;
        if (gameManager.mainMenu) return;
        if (gameManager.quitGame) return;
        if (gameManager.difficultySelectMenu) return;
        if (gameManager.newGame) return;
        if (gameManager.isPaused) return;

        this.ball.update();
        this.player.update(this.gameManager);
        this.enemy.update(this.ball, this.gameManager, this.player, this.frameCount);
    }

    // called once every frame; checks and handles collisions between all game objects
    checkCollisions() {
        if (gameManager.isPaused) return;
        this.ball.checkCollisions(this.player, this.enemy, this.walls, this.pits, this.scoreboard);
        this.player.checkCollisions(this.walls);
        this.enemy.checkCollisions(this.walls);
    }

    // called once every frame; draws the 2D scene 
    render() {
        // prevent all animations if any of the menu screens are turned on
        if (gameManager.gameOver) return;
        if (gameManager.mainMenu) return;
        if (gameManager.quitGame) return;
        if (gameManager.difficultySelectMenu) return;
        if (gameManager.newGame) return;
        
        let context = this.gameManager.context;
        let canvas  = this.gameManager.canvas;
        
        this.gameManager.render();
        this.ball.render(context);
        this.player.render(context);
        this.enemy.render(context);
        this.scoreboard.render(canvas, context, this.gameManager, this.ball);
    }
}