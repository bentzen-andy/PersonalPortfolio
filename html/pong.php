<!DOCTYPE html>
<meta charset="utf-8">
<head>
    <title>Pong</title>
</head>

<body>
    <h1>Andy Bentzen</h1>

    <nav>
        <?php include '../php/navbar.php'; ?>
    </nav> 
    <div id="game"></div>
    <div id="score">
        <?php include '../php/scoreboard.php'; ?> 
    </div>

    <script src="../scripts/pong/Geometry.js"></script>
    <script src="../scripts/pong/Pit.js"></script>
    <script src="../scripts/pong/Wall.js"></script>
    <script src="../scripts/pong/Ball.js"></script>
    <script src="../scripts/pong/Enemy.js"></script>
    <script src="../scripts/pong/Paddle.js"></script>
    <script src="../scripts/pong/Player.js"></script>
    <script src="../scripts/pong/Scoreboard.js"></script>
    <script src="../scripts/pong/GameManager.js"></script>
    <script src="../scripts/pong/Pong.js"></script>
    <script src="../scripts/pong/main.js"></script>
</body>