<?php

require_once("settings.php");

if (isset($_POST['completed'])) {
	// escape post data
	$data = array();
	for ($i=0; $i < count($_POST['completed']); $i++) { 
		array_push($data, $db->real_escape_string($_POST['completed'][$i]));
	}

	$status = $db->query("UPDATE tasks 
					SET completed=1
					WHERE taskId IN (".implode(',',$data).")");

	if ($status !== TRUE) {
		header('HTTP/1.1 500 Failed to update tasks. '.$db->error);
		$db->close();
		exit();
	}

	echo "Entries successfully updated.";
}

?>