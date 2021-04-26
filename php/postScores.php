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

    function isInTopTop($currentScore, $data) {
        $name  = array_column($data, 'name');
        $score = array_column($data, 'score');
        
        // Sort the data with name descending, score ascending
        // Add $data as the last parameter, to sort by the common key
        array_multisort($score, SORT_DESC, $name, SORT_ASC, $data);
        
        // var_dump($data);
        return $currentScore > $data[9]['score'];
    }
    
    
    $name = $_POST['name'];
    $score = $_POST['score'];
    $difficulty = $_POST['difficulty'];

    $csvPath = "../data/scores.csv";
    $csvData = readCSV($csvPath);
    if (!isInTopTop($score, $csvData)) return;

    // post to the txt file
    if(isset($_POST['name'])) {
        $txt = "../data/scores.csv";
        $myFile = fopen($txt, 'a') or die("unable to open file!");
        fwrite($myFile, $name . "," . $score . "," . $difficulty . "\n");
        fclose($myFile);
    }

?>