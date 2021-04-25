// =======================================
// GameManager
// ---------------------------------------
class GameManager {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.canvas = this.makeCanvas();
        this.context = this.canvas.getContext('2d');
        
        this.isPaused = false;
        this.playerWins = false;
        this.gameOver = false;
        this.enemyWins = false;
        this.mainMenu = true;
        this.quitGame = false;
        this.difficultySelectMenu = false;
        this.difficultyEasy = false;
        this.difficultyNormal = false;
        this.difficultyHard = false;
        this.difficultyNightmare = false;
        this.newGame = false
    }

    // called once every frame
    //  checks win conditions and progresses the game through the menu options
    update(scoreboard, ball) {

        // check if player wins
        this.playerWins = this.checkPlayerWinConditions(scoreboard);

        // check if enemy wins
        this.enemyWins = this.checkEnemyWinConditions(scoreboard);

        // set win / loss msg
        if      (this.playerWins) { this.gameOver = true; }
        else if (this.enemyWins)  { this.gameOver = true; }
        
        // game over screen
        // wait for user input to see if a new game needs to be loaded
        if (this.gameOver) this.loadGameOverScreen(scoreboard);

        // check if new game needs to be loaded
        if (this.mainMenu) this.loadMainMenu();

        // check if the player quit the game
        if (this.quitGame) this.loadQuitGameMsg();

        // check if the difficulty selection menu is on
        if (this.difficultySelectMenu) this.loadDifficultySelectMenu();

        // load a new game 
        if (this.newGame) this.startGame(ball, scoreboard);

        // check if game is paused
        this.checkIsGamePaused();

    }

    render() { 
        // Clear the canvas
        this.context.clearRect(0, 0, this.width, this.height);
    }


    // =======================================
    // Helper Methods
    // ---------------------------------------

    // draws a horizontal line across the width of the canvas
    drawHorizontalLine(y) {
        this.context.beginPath();
        this.context.moveTo(0, y);
        this.context.lineTo(this.width, y);
        this.context.stroke();
    }

    // draws the environment for the game and posts it to the HTML doc
    makeCanvas() {
        let cnvs = document.createElement("canvas");
        cnvs.width  = this.width;
        cnvs.height = this.height;
        cnvs.style.backgroundColor = this.color;

        let gameElement = document.getElementById('game');
        gameElement.appendChild(cnvs);
        return cnvs;
    }

    // event handler for pausing the game
    checkIsGamePaused() {
        let spacebar = "32";
        if      (keysDown[spacebar] && this.isPaused)  { this.isPaused = false; delete keysDown[spacebar]; }
        else if (keysDown[spacebar] && !this.isPaused) { this.isPaused = true;  delete keysDown[spacebar]; }

    }

    checkPlayerWinConditions(scoreboard) {
        return scoreboard.score1 === 5;
    }
    
    checkEnemyWinConditions(scoreboard) {
        return scoreboard.score2 === 5;
    }

    // displays message and handles user input for the menu
    loadGameOverScreen(scoreboard) {
        this.render();
        
        this.drawHorizontalLine(this.height / 2.0 - 30);
        this.drawHorizontalLine(this.height / 2.0 + 30);
        
        let msg1 = (this.playerWins) ? "YOU WIN!!!" : "You lost...";
        let msg2 = "Press Enter to play again";
        this.context.font = "20px Helvetica";
        this.context.fillStyle = "#000000";
        this.context.fillText(msg1, 20, this.height / 2.0 + 25);
        this.context.fillText(msg2, 20, this.height / 2.0 + 25 + 40);
        

        // user input to start a new game of quit
        let enter = "13";
        if (keysDown[enter] && (this.gameOver)) {
            delete keysDown[enter];
            this.mainMenu = true;
            this.gameOver = false;
            scoreboard.score1 = 0;
            scoreboard.score2 = 0;
        }

    }

    // displays message and handles user input for the menu
    loadMainMenu() {
        this.render();

        this.drawHorizontalLine(this.height / 2.0 - 60);
        this.drawHorizontalLine(this.height / 2.0 + 60);
        
        let msg1 = "PONG";
        let msg2 = "New Game: Enter";
        let msg3 = "Quit: ESC";
        this.context.font = "20px Helvetica";
        this.context.fillStyle = "#000000";
        this.context.fillText(msg1, 20, this.height / 2.0 + 0);
        this.context.fillText(msg2, 20, this.height / 2.0 + 25);
        this.context.fillText(msg3, 20, this.height / 2.0 + 25 + 20);

        // wait for user input
        let enter = "13";
        let esc = "27";
        if (keysDown[enter]) { this.difficultySelectMenu = true; this.mainMenu = false; delete keysDown[enter]; }
        if (keysDown[esc])   { this.quitGame = true;             this.mainMenu = false; delete keysDown[esc]; }

    }

    // displays message and handles user input for the menu
    loadQuitGameMsg() {
        this.render();

        this.drawHorizontalLine(this.height / 2.0 - 30);
        this.drawHorizontalLine(this.height / 2.0 + 30);
        
        let msg = "Thanks for playing!"
        this.context.font = "40px Helvetica";
        this.context.fillStyle = "#000000";
        this.context.fillText(msg, 20, this.height / 2.0 + 25);
    }

    // displays message and handles user input for the menu
    loadDifficultySelectMenu() {
        this.render();

        this.drawHorizontalLine(this.height / 2.0 - 60);
        this.drawHorizontalLine(this.height / 2.0 + 60);
        
        let msg1 = "Select difficulty: ";
        let msg2 = "Easy: 1";
        let msg3 = "Normal: 2";
        let msg4 = "Hard: 3";
        let msg5 = "Nightmare: 4";

        this.context.font = "20px Helvetica";
        this.context.fillStyle = "#000000";
        this.context.fillText(msg1, 20, this.height / 2.0 - 40);
        this.context.fillText(msg2, 20, this.height / 2.0 - 20);
        this.context.fillText(msg3, 20, this.height / 2.0 + 0);
        this.context.fillText(msg4, 20, this.height / 2.0 + 20);
        this.context.fillText(msg5, 20, this.height / 2.0 + 40);

        // reset all difficulty settings
        this.difficultyEasy = false;
        this.difficultyNormal = false;
        this.difficultyHard = false;
        this.difficultyNightmare = false;

        // wait for user input
        let easy      = "49";
        let normal    = "50";
        let hard      = "51";
        let nightmare = "52";
        let esc       = "27";
        if (keysDown[easy])      { this.difficultyEasy = true;      this.difficultySelectMenu = false; this.newGame = true; delete keysDown[easy]; }
        if (keysDown[normal])    { this.difficultyNormal = true;    this.difficultySelectMenu = false; this.newGame = true; delete keysDown[normal]; }
        if (keysDown[hard])      { this.difficultyHard = true;      this.difficultySelectMenu = false; this.newGame = true; delete keysDown[hard]; }
        if (keysDown[nightmare]) { this.difficultyNightmare = true; this.difficultySelectMenu = false; this.newGame = true; delete keysDown[nightmare]; }
        if (keysDown[esc])       { this.mainMenu = true;            this.difficultySelectMenu = false;                      delete keysDown[esc]; }

    }

    // changes state of the game to gameplay. all menu states are turned off.
    startGame(ball, scoreboard) {
        this.render();

        // reset all the main menu variables
        scoreboard.score1 = 0;
        scoreboard.score2 = 0;
        this.isPaused = false;
        this.playerWins = false;
        this.enemyWins = false;
        this.gameOver = false;
        this.mainMenu = false;
        this.quitGame = false;
        this.difficultySelectMenu = false;
        this.newGame = false

        if      (this.difficultyEasy)      ball.originalSpeed = 4.0;
        else if (this.difficultyNormal)    ball.originalSpeed = 5.0;
        else if (this.difficultyHard)      ball.originalSpeed = 6.0;
        else if (this.difficultyNightmare) ball.originalSpeed = 7.0;

        // load a new ball to start the game
        ball.resetBall();
    }
}