// =======================================
// Scoreboard
// ---------------------------------------
class Scoreboard {
    constructor(score1, score2) {
        this.score1 = score1;
        this.score2 = score2;
        this.leaderBoardScore = 0;
    }

    // called every frame. draws the current score to the HUD
    render(canvas, context, gameManager, ball) {
        context.beginPath();
        context.moveTo(0, canvas.height - 30);
        context.lineTo(canvas.width, canvas.height - 30);
        context.stroke();

        // text for difficulty setting
        let difficulty = "";
        if      (gameManager.difficultyEasy)      difficulty = "Easy";
        else if (gameManager.difficultyNormal)    difficulty = "Normal";
        else if (gameManager.difficultyHard)      difficulty = "Hard";
        else if (gameManager.difficultyNightmare) difficulty = "Nightmare";

        // text for ball speed
        let ballSpeed = Math.round((ball.getSpeed() + Number.EPSILON) * 10) / 10
        
        context.font = "16px Helvetica";
        context.fillStyle = "#000000";
        context.fillText("Points: " + this.score1 + ":" + this.score2 + ", " + "Difficulty: " + difficulty + ", Ball Speed: " + ballSpeed , 5, canvas.height - 12);
    }
}