<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	try{
		exec('redis-cli -p 6380 flushall');
		die('Cache has been flushed.');
	}catch(Exception $e){
		header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		die('Error while flushing cache : '.$e->getMessage());
	}
} else {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
	die('Bad request');
}

?>