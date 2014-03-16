<?php

require_once("settings.php");

if ( isset($_POST['taskName']) && isset($_POST['taskDate']) ) {
	// escape post values
	$taskName = $db->escape_string($_POST['taskName']);
	$taskDate = $db->escape_string($_POST['taskDate']);

	// validate user inputs
	if (strlen($taskName) < 1) {
		header('HTTP/1.1 500 Taskname is empty!');
		exit();
	}

	if (strlen($taskDate) < 1) {
		header('HTTP/1.1 500 Taskdate is empty!');
	}

	$status = $db->query("INSERT INTO tasks (taskName, taskExpirationDate)
					VALUES ('$taskName', '$taskDate')");

	if ($status !== TRUE) {
		header('HTTP/1.1 500 Task could not be saved. '.$db->error);
		$db->close();
		exit();
	}

	echo "Task successfully inserted.";
}




?>