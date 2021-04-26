// ================================================
// Update 
// runs approx 60x/second to run animations
// ------------------------------------------------
function update() {
    pong.update();
    pong.checkCollisions();
    pong.render();

    // call up the next frame for the animation
    requestAnimationFrame(update);
}

// ================================================
// Driver Code - (global scope)
// These are all temp variables that are global, but are not intended 
// to be directly used anywhere else in the program. Only used to add
// clarity to object constructors below. 
// ------------------------------------------------

// game properties
let gameWidth = 400.0;
let gameHeight = 500.0;
let gameColor = '#E0E0E0';  

// player
let playerWidth = 80.0;
let playerHeight = 10.0;
let player_x = gameWidth / 2.0;
let player_y = gameHeight - 70.0;
let player_dx = 7.0;
let playerColor = '#FFFFFF';
// let playerColor = '#00BFFF';

// enemy
let enemyWidth = 80.0;
let enemyHeight = 10.0;
let enemy_x = gameWidth / 2.0;
let enemy_y = 10.0
let enemy_dx = 3.0;
let enemyColor = '00BFFF';
// let enemyDifficulty = 1.00;

// ball
let ball_x = gameWidth / 2.0;
let ball_y = gameHeight / 2.0;
let ballRadius = 5.0;
let ballColor = '#00BFFF';
let ballSpeed = 4.0; 

// walls and pits
let pt1 = { x: 0.0,        y: 0.0 } ;
let pt2 = { x: gameWidth,  y: 0.0 } ;
let pt3 = { x: gameWidth,  y: gameHeight - 60.0 } ;
let pt4 = { x: 0.0,        y: gameHeight - 60.0 } ;
let walls = [];
let pits = [];

// create game objects 
let gameManager = new GameManager(gameWidth, gameHeight, gameColor);
let playerPaddle = new Paddle(playerWidth, playerHeight, player_x, player_y, playerColor, player_dx);
let enemyPaddle = new Paddle(enemyWidth, enemyHeight, enemy_x, enemy_y, enemyColor, enemy_dx);
let player = new Player(playerPaddle);
let enemy = new Enemy(enemyPaddle);
let ball = new Ball(ball_x, ball_y, ballRadius, ballColor, ballSpeed);
walls.push(new Wall("leftWall",  pt1, pt4));
walls.push(new Wall("rightWall", pt2, pt3));
pits.push(new Pit("upperPit", pt1, pt2));
pits.push(new Pit("lowerPit", pt4, pt3));
let scoreboard = new Scoreboard(0, 0);

// user input
let keysDown = { };  // GLOBAL SCOPE
window.addEventListener("keydown", event => {
keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", event => {
delete keysDown[event.keyCode];
});

let pong = new Pong(gameManager, ball, player, enemy, walls, pits, scoreboard);
requestAnimationFrame(update);