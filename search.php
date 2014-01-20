<?php
// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!
 
$data = file_get_contents("php://input");
 
$objData = json_decode($data);
 

$values = array('1', 'web', 'angularjs', 'js');
 
$easy = array( "In a file named \"filename\" ,how do you print the lines between 5 and 10, both inclusive?");


if($objData->data=='1'){
	echo $easy[0];
	
}
else if(in_array($objData->data, $values)) {
    echo 'I have found what you\'re looking for!';
}
else {
    echo 'Sorry, no match!';
}