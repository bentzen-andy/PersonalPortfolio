<!DOCTYPE html>
<meta charset="utf-8">
<head>
    <title>Pong</title>
    <link rel="stylesheet" href="../css/main.css">
</head>

<body>
    <h1>Andy Bentzen</h1>

    <nav>
        <?php include '../php/navbar.php'; ?>
    </nav> 
    <div id="game" class="float-left"></div>
    <div id="score" class="float-left">
        <?php include '../php/scoreboard.php'; ?> 
    </div>
    <div id="new-high-score-form" class="float-left"></div>

    <script src="../scripts/pong/ajax.js"></script>
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

<footer>
    <?php include '../php/footer.php'; ?>
</footer>
</body>