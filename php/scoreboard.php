<?php 

    function readCSV($file) {
      $row = 0;
      $csvArray = array();
      if( ( $handle = fopen($file, "r") ) !== FALSE ) {
        while( ( $data = fgetcsv($handle, 1000, ",") ) !== FALSE ) {
            $csvArray[$row] = [ 'name' => $data[0], 'score' => $data[1], 'difficulty' => $data[2] ];
          $row++;
        }
      }
      if( !empty( $csvArray ) ) {
        return $csvArray;
      } else {
        return false;
      }
    }

    function postTopTen($csvData) {
        $name  = array_column($csvData, 'name');
        $score = array_column($csvData, 'score');

        // Sort the data with name descending, score ascending
        // Add $data as the last parameter, to sort by the common key
        array_multisort($score, SORT_DESC, $name, SORT_ASC, $csvData);

        print "<h3>";
        print "---High Scores!---";
        print "</h3>";
        print "<table>";
        print "<tr><td>Name</td><td>Score</td><td>Difficulty</td><tr>";

        $i = 0;
        $row = 0;
        while (TRUE) {
            print "<tr>";
            print "<td>";
            print $csvData[$row]['name'];
            print "</td>";
            print "<td>";
            print $csvData[$row]['score'];
            print "</td>";
            print "<td>";
            print $csvData[$row]['difficulty'];
            print "</td>";
            print "</tr>";
            // print $row . "\n";
            $row++;
            $i++;
            if (!isset($csvData[$row])) break;
            if ($i == 10) break;
        }
        print "</table>";
    }


    $csvPath = "../data/scores.csv";
    $csvData = readCSV($csvPath);
    $topTen  = postTopTen($csvData);

?>