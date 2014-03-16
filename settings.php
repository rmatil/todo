<?php

############ database setup ################
define('DB_SERVER',"localhost");
define('DB_PORT',"3306");
define('DB_NAME',"todo");

define('DB_USER',"root");
define('DB_PASSWORD',"root");
############################################


$db = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);

if ($db->connect_errno) {
	trigger_error("Connection to database failed.".$db->connect_error, E_USER_ERROR); 
	exit();
}

$db->query("SET NAMES utf8");






?>