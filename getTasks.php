<?php

require_once("settings.php");

$result = $db->query("SELECT taskId, taskName, taskExpirationDate, completed
						FROM tasks
						ORDER BY taskExpirationDate");

if (!$result) {
	header('HTTP/1.1 500 Failed to get all tasks. '.$db->error);
	$db->close();
	exit();
} 

// make an associative array
$resultArray = array ();
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
	array_push($resultArray, $row);
}

// return result as json
header('Content-type: application/json');
echo json_encode($resultArray);

?>