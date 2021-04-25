<?php 
    $db = new SQLite3('../data/scoresDB.db');
    $results = $db->query('SELECT * FROM scores ORDER BY scores.score DESC;');

    print "<h3>";
    print "---High Scores!---";
    print "</h3>";
    print "<table>";
    print "<tr><td>Name</td><td>Score</td><td>Difficulty</td><tr>";

    $i = 0;
    while ($row = $results->fetchArray()) {
        print "<tr>";
        print "<td>" . $row['name'] . "</td>";
        print "<td>" . $row['score'] . "</td>";
        print "<td>" . $row['difficulty'] . "</td>";
        print "</td>";
        $i++;
        if ($i == 10) break;
    }

    print "</table>"
?>