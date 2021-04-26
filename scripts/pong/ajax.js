function ajaxPost() {

    // get form data
    var data = new FormData();
    data.append("name", document.getElementById("name").value);
    data.append("score", scoreboard.leaderBoardScore);
    let diff;
    if      (gameManager.difficultyEasy)      diff = "Easy";
    else if (gameManager.difficultyNormal)    diff = "Normal";
    else if (gameManager.difficultyHard)      diff = "Hard";
    else if (gameManager.difficultyNightmare) diff = "Nightmare";
    data.append("difficulty", diff);

    // AJAX call
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/postScores.php");

    // What to do when server responds
    xhr.onload = function() { console.log(this.response); };
    xhr.send(data);

    // remove the submission form for high score. 
    let form = document.getElementById('new-high-score-form');
    form.remove();

    // prevent page from reloading
    return false;
}